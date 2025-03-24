import Gantt from "../model/gantt.model.js";
import mongoose from "mongoose";

export const getGantt = async (req, res) => {
    try {
        const gantt = await Gantt.find();
        res.status(200).json({ sucess: true, data: gantt })
    } catch (error) {
        console.error('Error al obtener los datos:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}

export const createGantt = async (req, res) => {
    const gantt = req.body;

    try {
        const newGantt = new Gantt(gantt);
        await newGantt.save();
        res.status(201).json({ success: true, data: newGantt });
    } catch (error) {
        console.error('Error al crear la tarea:', error.message);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
}

export const deleteGantt = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No task with that id');
    }
}

export const updateGantt = async (req, res) => {
    const { id } = req.params;
    const gantt = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send('No task with that id');
    }

    const updatedGantt = await Gantt.findByIdAndUpdate(id, gantt, { new: true });

    res.json(updatedGantt);
}