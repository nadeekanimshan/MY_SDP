// routes/appointmentRoutes.js
import express from 'express';
import { getAppointmentsByClientId } from '../controllers/appointmentController.js';

const router = express.Router();

router.get('/appointments', getAppointmentsByClientId);

export default router;
