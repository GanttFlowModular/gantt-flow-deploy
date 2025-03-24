'use client';

import Image from "next/image";
import Button from "@/components/button";
import ProfileDropdown from "@/components/profileDropdown";
import { useRouter } from "next/navigation";


export default function Header({
    user,
}: {
    user?: { name: string, email: string } | null,
}) {
    const router = useRouter();

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
        <div>
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


            </main>
        </div>
    );
}