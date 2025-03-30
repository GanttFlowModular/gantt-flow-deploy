'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "../../../components/button";
import ProfileDropdown from "@/components/profileDropdown";

export default function CascaronAdmin({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [user, setUser] = useState<{
        email: string; name: string 
} | null>(null);

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
    }, [router]);

    const handleLogout = () => {
        // Eliminar el token y los datos del usuario de localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('next-auth.session-token');
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/auth/login';
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
                    <ProfileDropdown
                        name={user.name}
                        email={user.email}
                        onClick={handleLogout}
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
                        <Link href="/admin/audit" className="flex items-center space-x-1">
                            <Button
                                icon="/audit.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>Auditoría</span>
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

                {/* Contenido dinámico */}
                <div className="flex flex-col flex-grow ml-8">
                    <p className="mt-14 font-semibold">{date}</p>
                    <h1 className="text-7xl mt-4">Hola, {user.name}</h1>
                    {children} {/* Aquí se cargará el contenido de las páginas */}
                </div>
            </main>
        </div>
    );
}