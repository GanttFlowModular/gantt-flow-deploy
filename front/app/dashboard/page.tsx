"use client";

import { useSession, signOut } from "next-auth/react"; // Asegúrate de importar signOut
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  console.log(session?.user?.image);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/"); // Si no está autenticado, lo manda a la página de inicio
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col">
      {/* Barra superior */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        {/* Imagen de perfil y nombre */}
        <div className="flex items-center space-x-4">
          {/*<img
            src={session?.user?.image || "/default-avatar.jpg"} // Usa una imagen predeterminada si no hay imagen de usuario
            alt="Perfil de usuario"
            className="w-12 h-12 rounded-full cursor-pointer"
          />*/}
          <h1 className="text-xl font-semibold">{session?.user?.name}</h1>
        </div>

        {/* Correo y botón de cerrar sesión */}
        <div className="flex items-center space-x-4">
          <p className="text-sm">{session?.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/" })} // Se añade la URL de callback para redirigir después de cerrar sesión
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Resto de la página */}
      <div className="p-4">
        <h2>Contenido del Dashboard</h2>
        {/* Aquí puedes agregar el resto de tu contenido */}
      </div>
    </div>
  );
}


