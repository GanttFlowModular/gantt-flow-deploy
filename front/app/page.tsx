import Image from "next/image";
import Button from "../components/button";

export default function Home() {
  return (
    <div className="flex flex-col m-4 mx-4">
      {/* Header */}
      <header className="flex justify-start items-center">
        <div>
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
            alt="Next.js logo"
            width={114}
            height={18}
            priority
          />
        </div>
        <div className="ml-12 space-x-4">
          <Button
            text="Inicio"
            bgColor="#FFFFFF"
          />
        </div>
        <div className="ml-12 space-x-4">
          <Button
            text="¿Por qué GanttFlow?"
            bgColor="#FFFFFF"
          />
        </div>
        <div className="ml-auto">
          <Button
            text="Iniciar sesión"
            bgColor="#FFFFFF"
            border="border border-gray-200"
            hover="hover:bg-gray-100 hover:text-green-700"
            redirectTo="/login"
          />
        </div>
        <div className="ml-4">
          <Button
            text="Registrate"
            bgColor="bg-green-400"
            border="border border-gray-200"
            hover="hover:bg-gray-100 hover:text-green-700"
            redirectTo="/register"
          />
        </div>
      </header >
      {/* Contenido principal */}
      <main className="flex flex-col md:flex-row mt-32 space-y-8 md:space-y-0 md:space-x-10 items-center md:items-start" >
        <div className="text-center">
          <p className="font-bold text-center text-[100px] ml-4">
            Gantt
            <span className="block ">Flow</span>
          </p>

          <h2 className="text-xl font-semibold mt-4">
            Project Management
          </h2>

          <p className="text-lg mt-2">
            La mejor forma de organizar tu equipo, tiempo y tareas. Gantt es la solución para tu proyecto.
          </p>
        </div>

        {/* Imagen */}
        <Image
          className="dark:invert"
          src="diagrama.svg"
          alt="Diagrama de Gantt"
          width={840}
          height={450}
          priority
        />
      </main >
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-48">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div >
  );
}
