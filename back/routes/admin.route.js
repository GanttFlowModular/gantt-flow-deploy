import express from 'express';
import { createUserAdmin, getAllUsersAdmin, getUserById, updatedUserAdmin, deleteUserAdmin, assignPermissions, removePermissions, getUserPermissions, auditRoute } from '../controllers/admin.controller.js';
import {adminAuthMiddleware} from '../middlewares/adminCheck.js';

const router = express.Router();

// Todas las rutas protegidas
router.use(adminAuthMiddleware); 

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

//Ruta para auditoría
router.get('/audit', auditRoute);

export default router;