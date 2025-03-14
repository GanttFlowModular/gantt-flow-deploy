import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    systemPerformanceThreshold: { type: Number, default: 80 }, // Umbral de rendimiento
    maintenanceMode: { type: Boolean, default: false }, // Modo de mantenimiento
    lastMaintenanceDate: { type: Date },
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;