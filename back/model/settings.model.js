// gantt-flow/back/model/settings.model.js
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    systemName: { type: String, default: 'Gantt-Flow' }, // Nombre del sistema
    maintenanceMode: { type: Boolean, default: false }, // Modo de mantenimiento
    performanceMetrics: { // Métricas de rendimiento
        cpuUsage: { type: Number, default: 0 },
        memoryUsage: { type: Number, default: 0 },
        activeUsers: { type: Number, default: 0 },
    },
    organizationalSettings: { // Ajustes organizacionales
        companyName: { type: String, default: '' },
        timeZone: { type: String, default: 'UTC' },
        defaultLanguage: { type: String, default: 'es' },
    },
    updatedAt: { type: Date, default: Date.now }, // Fecha de última actualización
});

// Crear el modelo
const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;