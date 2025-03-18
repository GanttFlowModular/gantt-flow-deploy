'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js
import Button from "../../components/button";
import ProfileDropdown from "@/components/profileDropdown";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const dayName = today.toLocaleDateString('es-MX', { weekday: 'long' });
        const month = today.toLocaleDateString('es-MX', { month: 'long' });
        const day = today.getDate();
        const year = today.getFullYear();

        const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

        const formattedDate = `${capitalizedDayName}, ${day} de ${capitalizedMonth} de ${year}`;
        setDate(formattedDate);
    }, []);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <p>Cargando...</p>;
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
                    <ProfileDropdown />
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
                            onClick={() => signOut()}
                        />
                        <span onClick={() => signOut()} className="cursor-pointer">
                            Cerrar sesión
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-center ml-52">
                    <p className="mt-14 font-semibold">{date}</p>
                    <h1 className="text-7xl mt-4">Hola, {session?.user?.name || "Usuario"}</h1>
                </div>
            </main>
        </div>
    );
}