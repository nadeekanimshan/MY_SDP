import bcrypt from 'bcryptjs';
import { createToken } from '../middleware/token.js';
import pool from '../config/db.js';
import validator from 'validator';

// Helper function for common validation
const validateUserInput = (name, email, password, confirmPassword, phone) => {
  if (!email || !password) {
    return { valid: false, message: 'Email and password are required' };
  }

  if (!validator.isEmail(email)) {
    return { valid: false, message: 'Please enter a valid email' };
  }

  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }

  if (name && !name.trim()) {
    return { valid: false, message: 'Name is required' };
  }

  if (confirmPassword && password !== confirmPassword) {
    return { valid: false, message: 'Passwords do not match' };
  }

  if (phone && phone.length < 10) {
    return { valid: false, message: 'Please enter a valid phone number' };
  }

  return { valid: true };
};

// Register New User (Client or Student)
const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword, phone, address, institution, course, role } = req.body;

  const validation = validateUserInput(name, email, password, confirmPassword, phone);
  if (!validation.valid) {
    return res.status(400).json({ success: false, message: validation.message });
  }

  try {
    // Check if email exists in either clients or students
    const checkEmailQuery = `
      (SELECT email FROM clients WHERE email = ?)
      UNION
      (SELECT email FROM students WHERE email = ?)
    `;
    const [existingUsers] = await pool.query(checkEmailQuery, [email, email]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ success: false, message: 'Email is already registered' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (role === 'client') {
      // Insert new client
      const INSERT_CLIENT_QUERY = `
        INSERT INTO clients (client_name, email, password, tel_num, address)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await pool.query(INSERT_CLIENT_QUERY, [
        name,
        email,
        hashedPassword,
        phone,
        address || null
      ]);

      const token = createToken(result.insertId, 'client');
      return res.json({ 
        success: true, 
        token, 
        user: { id: result.insertId, name, email, role: 'client' }
      });

    } else if (role === 'student') {
      // Insert new student
      const INSERT_STUDENT_QUERY = `
        INSERT INTO students (student_name, email, password, tel_num, institution, course)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await pool.query(INSERT_STUDENT_QUERY, [
        name,
        email,
        hashedPassword,
        phone,
        institution || null,
        course || null
      ]);

      const token = createToken(result.insertId, 'student');
      return res.json({ 
        success: true, 
        token, 
        user: { id: result.insertId, name, email, role: 'student' }
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ success: false, message: 'Error during registration' });
  }
};

// Login User (for both clients and students)
const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: 'Email, password and role are required' });
  }

  try {
    let table, idField, nameField;
    if (role === 'client') {
      table = 'clients';
      idField = 'client_id';
      nameField = 'client_name';
    } else if (role === 'student') {
      table = 'students';
      idField = 'student_id';
      nameField = 'student_name';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role specified' });
    }

    const SELECT_USER_QUERY = `SELECT ${idField}, ${nameField}, email, password FROM ${table} WHERE email = ?`;
    const [rows] = await pool.query(SELECT_USER_QUERY, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = createToken(user[idField], role);
    res.json({ 
      success: true, 
      token, 
      user: {
        id: user[idField],
        name: user[nameField],
        email: user.email,
        role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
};

// Get user profile based on role
const getUserProfile = async (req, res) => {
  const { userId, role } = req.user;

  try {
    let table, idField, nameField;
    if (role === 'client') {
      table = 'clients';
      idField = 'client_id';
      nameField = 'client_name';
    } else if (role === 'student') {
      table = 'students';
      idField = 'student_id';
      nameField = 'student_name';
    } else {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    const SELECT_USER_QUERY = `
      SELECT ${idField} as id, ${nameField} as name, email, tel_num as phone, join_date
      ${role === 'client' ? ', address' : ', institution, course'}
      FROM ${table} WHERE ${idField} = ?
    `;
    const [rows] = await pool.query(SELECT_USER_QUERY, [userId]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, user: { ...rows[0], role } });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ success: false, message: 'Error fetching user data' });
  }
};

export { registerUser, loginUser, getUserProfile };