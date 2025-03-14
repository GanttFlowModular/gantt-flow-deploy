import User from '../model/users.model..js';
import bcrypt from 'bcrypt';
import { createUser, deleteUser, getUsers, updatedUser } from "../controllers/users.controller.js";

export const createUserAdmin = createUser;
export const deleteUserAdmin = deleteUser;
export const getAllUsersAdmin = getUsers;
export const updatedUserAdmin = updatedUser;

export const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("error in fetching user:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const assignPermissions = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Agregar nuevos permisos (evitando duplicados)
        user.permissions = [...new Set([...user.permissions, ...permissions])];
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("error in assigning permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const removePermissions = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Filtrar permisos para remover los especificados
        user.permissions = user.permissions.filter(perm => !permissions.includes(perm));
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("error in removing permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getUserPermissions = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }
        res.status(200).json({ success: true, permissions: user.permissions });
    } catch (error) {
        console.log("error in fetching permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const updatePermissions = async (req, res) => {
    const { id } = req.params;
    const { permissions } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // Reemplazar todos los permisos
        user.permissions = permissions;
        await user.save();

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("error in updating permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

