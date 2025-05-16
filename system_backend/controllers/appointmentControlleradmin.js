// controllers/appointmentController.js
import pool from '../config/db.js';

export const getAppointmentsByClientId = async (req, res) => {
  const clientId = req.query.client_id || 2; // fallback to 2

  try {
    const [rows] = await pool.query(
      'SELECT * FROM appointments WHERE Client_ID = ?',
      [clientId]
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).json({ error: 'Database error', details: err });
  }
};
