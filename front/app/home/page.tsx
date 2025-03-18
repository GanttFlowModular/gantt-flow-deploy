'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Button from "../../components/button";
import ProfileDropdown from "@/components/profileDropdown";

export default function Dashboard() {
    const router = useRouter();
    const [date, setDate] = useState('');
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

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
                    <ProfileDropdown
                        name={user.name}
                        email={user.email}
                        onClick={handleLogout}
                    />
                </div>
            </header>

            {/* Main content */}
            <main className="flex flex-row justify-start flex-grow">
                {/* Rectangle with navigation links */}
                <div className="w-[219px] h-[720px] bg-green-500 rounded-lg shadow-lg mt-8 mr-8 text-white flex flex-col p-4">
                    {/* Navigation Items */}
                    <div className="flex flex-col space-y-4">
                        {/* Inicio */}
                        <div className="flex items-center space-x-1">
                            <Button
                                icon="/home.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>
                                <Link href="/inicio">
                                    Inicio
                                </Link>
                            </span>
                        </div>

                        {/* Mis tareas */}
                        <div className="flex items-center space-x-1">
                            <Button
                                icon="/tasks.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>
                                <Link href="/tasks">
                                    Mis tareas
                                </Link>
                            </span>
                        </div>

                        {/* Proyectos */}
                        <div className="flex items-center space-x-1">
                            <Button
                                icon="/projects.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>
                                <Link href="/projects">
                                    Proyectos
                                </Link>
                            </span>
                        </div>

                        {/* Reportes */}
                        <div className="flex items-center space-x-1">
                            <Button
                                icon="/reports.svg"
                                iconWidth={30}
                                iconHeight={30}
                                bgColor="bg-transparent"
                                border="border-none"
                            />
                            <span>
                                <Link href="/reports">
                                    Reportes
                                </Link>
                            </span>
                        </div>
                    </div>

                    {/* Logout*/}
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
                <div className="flex flex-col items-center ml-52">
                    <p className="mt-14 font-semibold">{date}</p>
                    <h1 className="text-7xl mt-4">Hola, {user.name}</h1>
                </div>
            </main>
        </div>
    );
}