import User from '../model/users.model.js';
import mongoose from 'mongoose';
import { createUser, deleteUser, getUsers, updatedUser } from "../controllers/users.controller.js";
import { getAuditLogs } from '../controllers/audit.controller.js';
import {logAction} from '../controllers/audit.controller.js';

export const createUserAdmin = createUser;
export const deleteUserAdmin = deleteUser;
export const getAllUsersAdmin = getUsers;
export const updatedUserAdmin = updatedUser;

export const auditRoute = async (req, res) =>{
    try {
        const { page = 1, limit = 10, ...filters } = req.query;
        
        // Convertir parámetros a números
        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        
        // Validación de parámetros
        if (isNaN(parsedPage)) throw new Error('Page inválido');
        if (isNaN(parsedLimit)) throw new Error('Limit inválido');
  
        const result = await getAuditLogs(
          parsedPage,
          parsedLimit,
          filters
        );
        
        res.status(200).json(result);
      } catch (error) {
        console.error('Error en GET /admin/audit:', error);
        res.status(500).json({ 
          error: 'Error del servidor',
          message: error.message 
        });
      }
    
}

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
    const { id: userId } = req.params;
    const { permissions } = req.body; // Asegúrate de que permissions sea un array

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        //Guardar permisos originales para el log
        const originalPermissions = [...user.permissions]; 

        // Agrega los nuevos permisos (evita duplicados)
        permissions.forEach(permission => {
            if (!user.permissions.includes(permission)) {
                user.permissions.push(permission);
            }
        });

        await user.save();
        // Registrar auditoría
        await logAction(req.user?._id, 'PERMISSION_ASSIGN', `Permisos asignados a ${user.email}: ${permissions.join(', ')} | Originales: ${originalPermissions.join(', ')}`, req.ip, user._id, 'User');
        
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error assigning permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const removePermissions = async (req, res) => {
    const { id: userId } = req.params;
    const { permissions } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Filtra los permisos para remover los especificados
        user.permissions = user.permissions.filter(permission => !permissions.includes(permission));

        await user.save();
        // Registrar auditoría
        await logAction(req.user?._id,'PERMISSION_REMOVE', `Permisos revocados de ${user.email}: ${permissions.join(', ')} | Permisos restantes: ${user.permissions.join(', ')}`, req.ip, user._id, 'User');

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.log("Error revoking permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const getUserPermissions = async (req, res) => {
    const { id: userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).json({ success: false, message: "Invalid User Id" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, data: user.permissions });
    } catch (error) {
        console.log("Error fetching user permissions:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

