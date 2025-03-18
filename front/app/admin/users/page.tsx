'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../components/button";
import { getAllUsersAdmin, updatedUserAdmin, deleteUserAdmin, createUserAdmin } from "@/app/lib/api";

interface User {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    role: string;
}

export default function adminPage() {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios
    const [editingUser, setEditingUser] = useState<User | null>(null); // Estado para el usuario que se está editando
    const [isCreatingUser, setIsCreatingUser] = useState(false); // Estado para controlar la visibilidad del formulario
    const [newUser, setNewUser] = useState({ // Estado para almacenar los datos del nuevo usuario
        name: '',
        email: '',
        mobile: '',
        password: '',
        role: '',
    })

    // Obtener usuarios desde el backend
    const fetchUsers = async () => {
        try {
            const usersData = await getAllUsersAdmin(); 
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
            const savedUser = await updatedUserAdmin(updatedUser._id, updatedUser); // Llama a la función updateUser
            const updatedUsers = users.map((user) =>
            user._id === savedUser._id ? savedUser : user
        );
        setUsers(updatedUsers); // Actualiza la lista de usuarios
        setEditingUser(null);
        await fetchUsers();//refrescar la lista de usuarios
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
            await deleteUserAdmin(userId); // Llama a la función deleteUser
            if (editingUser?._id === userId) {
                setEditingUser(null); // Limpiar el estado editingUser si el usuario eliminado estaba en edición
            }
            await fetchUsers();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
    const openCreateUserForm = () => {
        setIsCreatingUser(true); // Mostrar el formulario de creación
    }
    const closeCreateUserForm = () => {
        setIsCreatingUser(false); // Ocultar el formulario de creación
        setNewUser({ // Restablecer los datos del nuevo usuario
            name: '',
            email: '',
            mobile: '',
            password: '',
            role: '',
        })
    }
    const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    }
    const handleCreateUser = async () => {
        try {
            const response = await createUserAdmin(newUser); // Llama a la función createUserAdmin
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
    }

    useEffect(() => {
        // Obtener el token y los datos del usuario desde localStorage
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            // Si no hay token o datos de usuario, redirigir al login
            router.push('/auth/login');
        } else {
            // Si hay datos de usuario, parsearlos y guardarlos en el estado
            setUser(JSON.parse(userData));
        }

        // Formatear la fecha
        const today = new Date();
        const dayName = today.toLocaleDateString('es-MX', { weekday: 'long' });
        const month = today.toLocaleDateString('es-MX', { month: 'long' });
        const day = today.getDate();
        const year = today.getFullYear();

        const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        const formattedDate = `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
        setDate(formattedDate);

        // Obtener la lista de usuarios al cargar la página
        fetchUsers();
    }, [router]);

    const handleLogout = () => {
        // Eliminar el token y los datos del usuario de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Redirigir al login
        router.push('/auth/login');
    };

    if (!user) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se verifica la autenticación
    }

    return (
        <div className="min-h-screen flex flex-col m-4 mx-4">
            {/* Header */}
            <header className="flex justify-start items-center">
                <div className="ml-8">
                    <Image
                        className="dark:invert"
                        src="/logo.svg"
                        alt="Next.js logo"
                        width={40}
                        height={40}
                        priority
                    />
                </div>
                <div>
                    <Image
                        className="dark:invert"
                        src="/ganttflow.svg"
                        alt="Ganttflow logo"
                        width={114}
                        height={18}
                        priority
                    />
                </div>
                <div className="ml-auto">
                    <input
                        type="text"
                        placeholder="Search"
                        className="pl-4 pr-96 py-2 border border-blue-500 placeholder-black rounded-full"
                    />
                </div>
                <div className="ml-auto mr-4">
                    <Button
                        icon="/bell.svg"
                        iconWidth={40}
                        iconHeight={40}
                        bgColor="bg-transparent"
                        border="border-none"
                    />
                </div>
                <div className="space-x-16">
                    <Button
                        icon="/avatar.svg"
                        iconWidth={40}
                        iconHeight={40}
                        bgColor="bg-transparent"
                        border="border-none"
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="flex flex-row justify-start flex-grow">
                {/* Barra lateral */}
                <div className="w-[219px] h-[720px] bg-green-500 rounded-lg shadow-lg mt-8 mr-8 text-white flex flex-col p-4">
                    {/* Navigation Items */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/admin/users" className="flex items-center space-x-1">
                            <Button
                                icon="/home.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>Inicio</span>
                        </Link>
                        <Link href="/admin/users" className="flex items-center space-x-1">
                            <Button
                                icon="/users.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>Usuarios</span>
                        </Link>
                        <Link href="/admin/settings" className="flex items-center space-x-1">
                            <Button
                                icon="/settings.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>Configuración</span>
                        </Link>
                        <Link href="/admin/users/permissions" className="flex items-center space-x-1">
                            <Button
                                icon="/permissions.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>Permisos</span>
                        </Link>
                    </div>

                    {/* Logout */}
                    <div className="flex items-center space-x-1 mt-auto">
                        <Button
                            icon="/logout.svg"
                            iconWidth={32}
                            iconHeight={30}
                            bgColor="bg-transparent"
                            border="border-none"
                            onClick={handleLogout}
                        />
                        <span onClick={handleLogout} className="cursor-pointer">
                            Cerrar sesión
                        </span>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex flex-col flex-grow ml-8">
                    <p className="mt-14 font-semibold">{date}</p>
                    <h1 className="text-7xl mt-4">Hola, {user.name}</h1>

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
                </div>
            </main>
            {isCreatingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
    );
}