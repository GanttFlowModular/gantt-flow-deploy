
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

export default function Menu({
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
        <div className="flex flex-row justify-start flex-grow">
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
                            <Link href="/home">
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
                            <Link href="/home/gantt">
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
        </div>

    )

}