'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usersAdmin } from "@/app/lib/api";
import CascaronAdmin from "../cascaron/page";

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
}

export default function AdminUsersPage() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios
    const [editingUser, setEditingUser] = useState<User | null>(null); // Estado para el usuario que se está editando
    const [isCreatingUser, setIsCreatingUser] = useState(false); // Estado para controlar la visibilidad del formulario
    const [newUser, setNewUser] = useState({ // Estado para almacenar los datos del nuevo usuario
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: 'user',
    });

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

    // Función para manejar la edición de un usuario
    const handleEditUser = (user: User) => {
        setEditingUser(user);
    };

    // Función para guardar los cambios de un usuario
    const handleSaveUser = async (updatedUser: User) => {
        try {
            const savedUser = await usersAdmin.updatedUserAdmin(updatedUser._id, updatedUser); // Llama a la función updateUser
            const updatedUsers = users.map((user) =>
                user._id === savedUser._id ? savedUser : user
            );
            setUsers(updatedUsers); // Actualiza la lista de usuarios
            setEditingUser(null);
            await fetchUsers(); // Refrescar la lista de usuarios
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
        }
    };

    // Función para eliminar un usuario
    const handleDeleteUser = async (userId: string) => {
        const isConfirmed = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
        if (!isConfirmed) {
            return; // Si el usuario cancela, no hacer nada
        }
        try {
            await usersAdmin.deleteUserAdmin(userId); // Llama a la función deleteUser
            if (editingUser?._id === userId) {
                setEditingUser(null); // Limpiar el estado editingUser si el usuario eliminado estaba en edición
            }
            await fetchUsers();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    // Abrir el formulario de creación de usuario
    const openCreateUserForm = () => {
        setIsCreatingUser(true); // Mostrar el formulario de creación
    };

    // Cerrar el formulario de creación de usuario
    const closeCreateUserForm = () => {
        setIsCreatingUser(false); // Ocultar el formulario de creación
        setNewUser({ // Restablecer los datos del nuevo usuario
            name: '',
            email: '',
            mobile: '',
            password: '',
            role: 'user',
        });
    };

    // Manejar cambios en el formulario de creación de usuario
    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Crear un nuevo usuario
    const handleCreateUser = async () => {
        try {
            // Verifica que el campo "role" tenga un valor válido
            if (!['user', 'admin'].includes(newUser.role)) {
                throw new Error('Rol no válido');
            }
            const response = await usersAdmin.createUserAdmin(newUser); // Llama a la función createUserAdmin
            if (response && response.success) { // Verifica que la respuesta sea válida
                alert(response.message); // Muestra un mensaje de éxito
                closeCreateUserForm(); // Cierra el formulario de creación
            } else {
                console.error('Respuesta del backend no válida:', response);
            }
        } catch (error) {
            console.error('Error al crear el usuario:', error);
        } finally {
            fetchUsers(); // Refrescar la lista de usuarios (se ejecuta siempre, haya o no error)
        }
    };

    // Obtener la lista de usuarios al cargar la página
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <CascaronAdmin>
            <div>
                {/* Tabla de usuarios */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
                    <button
                        onClick={openCreateUserForm}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Agregar usuario
                    </button>
                    <table className="min-w-full bg-gray border border-gray-300">
                        <thead>
                            <tr className="bg-green-500">
                                <th className="py-2 px-4 border-b">Nombre</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Teléfono</th>
                                <th className="py-2 px-4 border-b">Rol</th>
                                <th className="py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) =>
                                editingUser?._id === user._id ? (
                                    <tr key={user._id}>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                value={editingUser.name}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, name: e.target.value })
                                                }
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="email"
                                                value={editingUser.email}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, email: e.target.value })
                                                }
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <input
                                                type="text"
                                                value={editingUser.mobile}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, mobile: e.target.value })
                                                }
                                                className="w-full px-2 py-1 border rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <select
                                                value={editingUser.role}
                                                onChange={(e) =>
                                                    setEditingUser({ ...editingUser, role: e.target.value })
                                                }
                                                className="w-full px-2 py-1 border rounded"
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleSaveUser(editingUser)}
                                                className="bg-blue-500 text-white px-4 py-1 rounded"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditingUser(null)}
                                                className="bg-gray-500 text-white px-4 py-1 rounded ml-2"
                                            >
                                                Cancelar
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={user._id}>
                                        <td className="py-2 px-4 border-b">{user.name}</td>
                                        <td className="py-2 px-4 border-b">{user.email}</td>
                                        <td className="py-2 px-4 border-b">{user.mobile}</td>
                                        <td className="py-2 px-4 border-b">{user.role}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="bg-yellow-500 text-white px-4 py-1 rounded"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id)}
                                                className="bg-red-500 text-white px-4 py-1 rounded ml-2"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Formulario de creación de usuario */}
                {isCreatingUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-black p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-xl font-bold mb-4">Crear nuevo usuario</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    value={newUser.name}
                                    onChange={handleNewUserChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={handleNewUserChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                                <input
                                    type="text"
                                    name="mobile"
                                    placeholder="Teléfono"
                                    value={newUser.mobile}
                                    onChange={handleNewUserChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña"
                                    value={newUser.password}
                                    onChange={handleNewUserChange}
                                    className="w-full px-2 py-1 border rounded"
                                />
                                <select
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleNewUserChange}
                                    className="w-full px-2 py-1 border rounded"
                                >
                                    <option value="user">Usuario</option>
                                    <option value="admin">Administrador</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-4 mt-4">
                                <button
                                    onClick={closeCreateUserForm}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleCreateUser}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CascaronAdmin>
    );
}