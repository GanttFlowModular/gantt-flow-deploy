import express from 'express';
import { updateSettings, getSettings } from '../controllers/settings.controller.js';

const router = express.Router();

router.put('/settings', updateSettings); // Actualizar ajustes
router.get('/settings', getSettings); // Obtener ajustes

export default router;