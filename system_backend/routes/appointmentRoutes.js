import express from 'express';
import pool from '../config/db.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Create a new appointment
router.post('/',authMiddleware, async (req, res) => {
    const { id, title, start, end, status } = req.body;
    const client_id = req.body.userId

    try {
        const query = `
            INSERT INTO appointments (id, title, start_time, end_time, status, client_id)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await pool.query(query, [id, title, start, end, status, client_id]);
        res.status(201).json({ message: 'Appointment created successfully' });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM appointments');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Update appointment status
router.put('/:id', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        const query = `
            UPDATE appointments SET status = ? WHERE id = ?
        `;
        const [result] = await pool.query(query, [status, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment status updated successfully' });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ error: 'Failed to update appointment status' });
    }
});

// Delete an appointment
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = `
            DELETE FROM appointments WHERE id = ?
        `;
        const [result] = await pool.query(query, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ error: 'Failed to delete appointment' });
    }
});

export default router;