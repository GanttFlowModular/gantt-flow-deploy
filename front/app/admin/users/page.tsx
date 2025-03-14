'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/admin/users');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error al obtener usuarios:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/admin/users/${id}`);
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Gestión de Usuarios</h1>
            <Link href="/admin/users/create" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
                Crear nuevo usuario
            </Link>
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Nombre</th>
                        <th className="px-4 py-2">Correo</th>
                        <th className="px-4 py-2">Rol</th>
                        <th className="px-4 py-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b">
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                                <Link href={`/admin/users/edit/${user._id}`} className="text-blue-500 hover:underline mr-2">
                                    Editar
                                </Link>
                                <Link href={`/admin/users/permissions/${user._id}`} className="text-green-500 hover:underline mr-2">
                                    Permisos
                                </Link>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}