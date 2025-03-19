import express from 'express';
import { createUserAdmin, getAllUsersAdmin, getUserById, updatedUserAdmin, deleteUserAdmin, assignPermissions, removePermissions, getUserPermissions } from '../controllers/admin.controller.js';
//import { getSettings, updateSettings, monitorSystem, performMaintenance } from '../controllers/settings.controller.js';

const router = express.Router();

// Rutas para gestionar usuarios
router.post('/users', createUserAdmin); // Crear un nuevo usuario
router.get('/users', getAllUsersAdmin); // Obtener todos los usuarios
router.get('/users/:id', getUserById); // Obtener un usuario por ID
router.put('/users/:id', updatedUserAdmin); // Actualizar un usuario
router.delete('/users/:id', deleteUserAdmin); // Eliminar un usuario

// Rutas para gestionar permisos
router.post('/users/:id/permissions', assignPermissions); // Asignar permisos
router.delete('/users/:id/permissions', removePermissions); // Remover permisos
router.get('/users/:id/permissions',getUserPermissions);

// Ruta para obtener y actualizar los ajustes del sistema
//router.get('/settings',getSettings);
//router.post('/settings',updateSettings); 

// Ruta para monitorear el sistema
//router.get('/settings/monitor', monitorSystem);

// Ruta para realizar mantenimiento
//router.post('/settings/maintenance', performMaintenance);

export default router;