'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usersAdmin, permissionsAdmin } from "@/app/lib/api";
import CascaronAdmin from "../../cascaron/page";

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
    permissions: string[]; // Agregamos el campo de permisos
}

export default function AdminPermissionsPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios
    const [selectedUserId, setSelectedUserId] = useState<string>(''); // ID del usuario seleccionado
    const [availablePermissions, setAvailablePermissions] = useState<string[]>(['read', 'write', 'delete', 'manage']); // Permisos disponibles
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]); // Permisos seleccionados
    const [userPermissions, setUserPermissions] = useState<string[]>([]); // Permisos del usuario seleccionado

    // Obtener usuarios desde el backend
    const fetchUsers = async () => {
        try {
            const usersData = await usersAdmin.getAllUsersAdmin();
            console.log('Usuarios obtenidos:', usersData); // Log para depuración
            setUsers(usersData);
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
        }
    };

    // Cargar permisos del usuario seleccionado
    const loadUserPermissions = async () => {
        if (!selectedUserId) return;
        try {
            const permissions = await permissionsAdmin.getUserPermissions(selectedUserId);
            setUserPermissions(permissions);
        } catch (error) {
            console.error('Error al cargar permisos:', error);
        }
    };

    // Otorgar permisos al usuario seleccionado
    const handleGrantPermissions = async () => {
        if (!selectedUserId) return;
        try {
            console.log('Selected User ID:', selectedUserId);
            await permissionsAdmin.assignPermissions(selectedUserId, selectedPermissions);
            await loadUserPermissions(); // Recargar permisos después de otorgar
        } catch (error) {
            console.error('Error al otorgar permisos:', error);
        }
    };

    // Remover permisos del usuario seleccionado
    const handleRevokePermissions = async () => {
        try {
            await permissionsAdmin.removePermissions(selectedUserId, selectedPermissions);
            await loadUserPermissions(); // Recargar permisos después de remover
        } catch (error) {
            console.error('Error al remover permisos:', error);
        }
    };

    // Obtener la lista de usuarios al cargar la página
    useEffect(() => {
        fetchUsers();
    }, []);

    // Cargar permisos cuando se selecciona un usuario
    useEffect(() => {
        if (selectedUserId) {
            loadUserPermissions();
        }
    }, [selectedUserId]);

    return (
        <CascaronAdmin>
            <div>
                {/* Gestión de Permisos */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Gestión de Permisos</h2>
                    <div className="mb-4">
                        <label className="block mb-2">Seleccionar Usuario:</label>
                        <select
                            value={selectedUserId}
                            onChange={(e) => setSelectedUserId(e.target.value)}
                            className="w-full px-2 py-1 border rounded bg-pink-500 text-white"
                        >
                            <option value="">Seleccione un usuario</option>
                            {users.map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Permisos:</label>
                        <select
                            multiple
                            value={selectedPermissions}
                            onChange={(e) =>
                                setSelectedPermissions(Array.from(e.target.selectedOptions, (option) => option.value))
                            }
                            className="w-full px-2 py-1 border rounded bg-pink-500 text-white"
                        >
                            {availablePermissions.map((permission) => (
                                <option key={permission} value={permission}>
                                    {permission}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleGrantPermissions}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Otorgar Permisos
                    </button>
                    <button
                        onClick={handleRevokePermissions}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Remover Permisos
                    </button>
                    <div className="mt-4">
                        <h3 className="text-xl font-bold">Permisos del Usuario:</h3>
                        <ul className="list-disc pl-5">
                            {userPermissions.map((permission) => (
                                <li key={permission}>{permission}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </CascaronAdmin>
    );
}