import pool from '../config/db.js';

// Get available slots for a specific date
export const getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ success: false, message: 'Date is required' });
  }

  try {
    // Get all slots for the given date, including booked ones
    const GET_SLOTS_QUERY = `
      SELECT slot_date AS date, time_slot AS time, is_booked
      FROM available_slots 
      WHERE slot_date = ?
    `;

    const [slots] = await pool.query(GET_SLOTS_QUERY, [date]);

    res.json({ success: true, slots });
  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ success: false, message: 'Error fetching available slots' });
  }
};


// Book an appointment
export const bookAppointment = async (req, res) => {
  const { date, time, purpose, userId } = req.body;

  if (!date || !time || !purpose || !userId) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    await pool.query('START TRANSACTION');

    // 1. Find an available lawyer for the time slot
    const FIND_LAWYER_QUERY = `
      SELECT LawyerID FROM available_slots 
      WHERE slot_date = ? AND time_slot = ? AND is_booked = FALSE
      LIMIT 1
    `;
    
    const [lawyers] = await pool.query(FIND_LAWYER_QUERY, [date, time]);
    
    if (lawyers.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(400).json({ success: false, message: 'Slot no longer available' });
    }

    const lawyerId = lawyers[0].LawyerID;

    // 2. Mark the slot as booked
    const UPDATE_SLOT_QUERY = `
      UPDATE available_slots 
      SET is_booked = TRUE 
      WHERE slot_date = ? AND time_slot = ? AND LawyerID = ?
    `;
    
    await pool.query(UPDATE_SLOT_QUERY, [date, time, lawyerId]);

    // 3. Create the appointment
    const CREATE_APPOINTMENT_QUERY = `
      INSERT INTO appointments 
      (CustomerID, LawyerID, appointment_date, time_slot, purpose) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    const [result] = await pool.query(CREATE_APPOINTMENT_QUERY, [
      userId,
      lawyerId,
      date,
      time,
      purpose
    ]);

    await pool.query('COMMIT');
    
    res.json({ 
      success: true, 
      appointmentId: result.insertId,
      message: 'Appointment booked successfully'
    });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error booking appointment:', error);
    res.status(500).json({ success: false, message: 'Error booking appointment' });
  }
};

export const generateSlots = async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ 
      success: false, 
      message: 'Start date and end date are required' 
    });
  }

  try {
    // Business hours configuration (adjust as needed)
    const businessHours = {
      start: 14,  
      end: 19,   
      slotDuration: 30 
    };

    // Get all lawyers without the 'active' filter
    const [lawyers] = await pool.query('SELECT LawyerID FROM lawyers');
    
    if (lawyers.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No lawyers found' 
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const slotsCreated = [];

    await pool.query('START TRANSACTION');

    try {
      // Loop through each day in the date range
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        // Skip weekends (Saturday=6, Sunday=0)
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dateStr = date.toISOString().split('T')[0];
        
        // Generate time slots for each lawyer
        for (const lawyer of lawyers) {
          // Clear existing slots for this date (optional - depends on your needs)
          await pool.query(
            'DELETE FROM available_slots WHERE LawyerID = ? AND slot_date = ?',
            [lawyer.LawyerID, dateStr]
          );

          // Generate slots for business hours
          for (
            let hour = businessHours.start;
            hour < businessHours.end;
            hour += businessHours.slotDuration / 60
          ) {
            const minutes = (hour % 1) * 60;
            const timeStr = `${Math.floor(hour).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
            
            await pool.query(
              'INSERT INTO available_slots (LawyerID, slot_date, time_slot, is_booked) VALUES (?, ?, ?, FALSE)',
              [lawyer.LawyerID, dateStr, timeStr]
            );
            
            slotsCreated.push({
              lawyerId: lawyer.LawyerID,
              date: dateStr,
              time: timeStr
            });
          }
        }
      }

      await pool.query('COMMIT');
      
      res.json({ 
        success: true,
        message: `Successfully generated ${slotsCreated.length} slots`,
        slotsCreated
      });
      
    } catch (error) {
      await pool.query('ROLLBACK');
      throw error;
    }
    
  } catch (error) {
    console.error('Error generating slots:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error generating slots',
      error: error.message 
    });
  }
};
export const getAppointments = async (req, res) => {
  const { userId } = req.body; // Receive userId from request body

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    // Fetch appointments for the customer (userId)
    const FETCH_APPOINTMENTS_QUERY = `
      SELECT AppointmentID, CustomerID, LawyerID, appointment_date, time_slot, purpose, status, created_at 
      FROM appointments 
      WHERE CustomerID = ? 
      ORDER BY appointment_date ASC
    `;
    
    const [appointments] = await pool.query(FETCH_APPOINTMENTS_QUERY, [userId]);

    if (appointments.length === 0) {
      return res.status(404).json({ success: false, message: 'No appointments found' });
    }

    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
};
export const getAllAppointments = async (req, res) => {
  try {
    // Fetch all appointments from the database
    const FETCH_APPOINTMENTS_QUERY = `
      SELECT AppointmentID, CustomerID, LawyerID, appointment_date, time_slot, purpose, status, created_at 
      FROM appointments
      ORDER BY appointment_date ASC
    `;
    
    const [appointments] = await pool.query(FETCH_APPOINTMENTS_QUERY);

    if (appointments.length === 0) {
      return res.status(404).json({ success: false, message: 'No appointments found' });
    }

    // Send the fetched appointments
    res.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, message: 'Error fetching appointments' });
  }
};
