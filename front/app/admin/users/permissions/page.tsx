'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../../components/button";
import { getAllUsersAdmin, assignPermissions, removePermissions, getUserPermissions } from "@/app/lib/api";

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
    const [date, setDate] = useState('');
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios
    const [selectedUserId, setSelectedUserId] = useState<string>(''); // ID del usuario seleccionado
    const [availablePermissions, setAvailablePermissions] = useState<string[]>(['read', 'write', 'delete', 'manage']); // Permisos disponibles
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]); // Permisos seleccionados
    const [userPermissions, setUserPermissions] = useState<string[]>([]); // Permisos del usuario seleccionado

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

    // Cargar permisos del usuario seleccionado
    const loadUserPermissions = async () => {
        if (!selectedUserId) return;
        try {
            const permissions = await getUserPermissions(selectedUserId);
            setUserPermissions(permissions);
        } catch (error) {
            console.error('Error al cargar permisos:', error);
        }
    };

    // Otorgar permisos al usuario seleccionado
    const handleGrantPermissions = async () => {
        try {
            await assignPermissions(selectedUserId, selectedPermissions);
            await loadUserPermissions(); // Recargar permisos después de otorgar
        } catch (error) {
            console.error('Error al otorgar permisos:', error);
        }
    };

    // Remover permisos del usuario seleccionado
    const handleRevokePermissions = async () => {
        try {
            await removePermissions(selectedUserId, selectedPermissions);
            await loadUserPermissions(); // Recargar permisos después de remover
        } catch (error) {
            console.error('Error al remover permisos:', error);
        }
    };

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

    useEffect(() => {
        if (selectedUserId) {
            loadUserPermissions();
        }
    }, [selectedUserId]);

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

                    {/* Gestión de Permisos */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Gestión de Permisos</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Seleccionar Usuario:</label>
                            <select
                                value={selectedUserId}
                                onChange={(e) => setSelectedUserId(e.target.value)}
                                className="w-full px-2 py-1 border rounded"
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
                                className="w-full px-2 py-1 border rounded"
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
            </main>
        </div>
    );
}