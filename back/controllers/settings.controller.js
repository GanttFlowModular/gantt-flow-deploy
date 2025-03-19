// gantt-flow/back/controllers/admin.controller.js
import Settings from '../model/settings.model.js';

// Obtener los ajustes del sistema
export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne();
        if (!settings) {
            return res.status(404).json({ message: 'Settings not found' });
        }
        res.json(settings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching settings', error });
    }
};

// Actualizar los ajustes del sistema
export const updateSettings = async (req, res) => {
    try {
        const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updatedSettings);
    } catch (error) {
        res.status(500).json({ message: 'Error updating settings', error });
    }
};

// Monitorear el rendimiento del sistema (simulado)
export const monitorSystem = async (req, res) => {
    try {
        // Simular métricas de rendimiento
        const metrics = {
            cpuUsage: Math.random() * 100,
            memoryUsage: Math.random() * 100,
            activeUsers: Math.floor(Math.random() * 100),
        };
        res.json(metrics);
    } catch (error) {
        res.status(500).json({ message: 'Error monitoring system', error });
    }
};

// Realizar mantenimiento (simulado)
export const performMaintenance = async (req, res) => {
    try {
        // Simular mantenimiento
        res.json({ message: 'Maintenance performed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error performing maintenance', error });
    }
};