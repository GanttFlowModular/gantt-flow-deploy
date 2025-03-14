import Settings from '../model/settings.model.js';

// 9. Actualizar ajustes del sistema
export const updateSettings = async (req, res) => {
    const { organizationName, systemPerformanceThreshold, maintenanceMode } = req.body;

    try {
        const settings = await Settings.findOneAndUpdate(
            {},
            { organizationName, systemPerformanceThreshold, maintenanceMode },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.log("error in updating settings:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// 12. Obtener ajustes organizacionales
export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({});
        res.status(200).json({ success: true, data: settings });
    } catch (error) {
        console.log("error in fetching settings:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};