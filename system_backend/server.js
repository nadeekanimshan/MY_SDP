import 'dotenv/config'; // Load environment variables
import express from 'express';
import cors from 'cors';
import pool from './config/db.js'; // Database connection pool
import userRouter from './routes/UserRouter.js'; // User routes
import AppointmentRouter from './routes/appointmentRoutes.js'; // Appointment routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors()); // Enable CORS

// Serve static images
app.use('/images', express.static('uploads'));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/appointments', AppointmentRouter);

// Test database connection
app.get('/test-db', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        res.json({ success: true, message: 'Database connected!', result: rows[0] });
    } catch (error) {
        console.error('Error connecting to the database:', error);
        res.status(500).json({ success: false, message: 'Error connecting to the database', error });
    }
});

// Root route
app.get('/', (req, res) => {
    res.send('API WORKING');
});

// Start the server
app.listen(port, () => {
    console.log(`Server starting on http://localhost:${port}`);
});