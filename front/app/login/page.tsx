'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import Button from "@/components/button";
import Link from "next/link";


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Iniciando sesión con:', email, password);
    };

    return (
        <div className="flex h-screen">

            <div className="flex-1 flex flex-col items-start justify-center">
                <div className="ml-40">

                    <h1 className="font-bold text-[25px]">Iniciar sesión</h1>

                    <form onSubmit={handleSubmit} className='space-y-7'>
                        <Button
                            icon="/loginGoogle.svg"
                            iconWidth={500}
                            iconHeight={64}
                            bgColor="bg-transparent"
                            border="border-none"
                            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                            redirectTo=''// Se añade para evitar error de TypeScript
                        />

                        <hr className="border-t-2 border-gray-200 my-4 w-full" />

                        <p className="font-bold">Correo</p>
                        <input
                            type="email"
                            placeholder="Escribe aquí tu correo"
                            className="w-full pl-4 py-4 border rounded-lg bg-gray-50"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="font-bold">Contraseña</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Escribe aquí tu contraseña"
                            className="w-full pl-4 py-4 border rounded-lg bg-gray-50"
                        />

                        <Button
                            icon="/iniciarSesion.svg"
                            iconWidth={500}
                            iconHeight={64}
                            bgColor="bg-transparent"
                            border="border-none"
                        />

                        <div className="text-center space-y-4">
                            <Link href="/about" className="text-gray-400 hover:underline block">
                                ¿Olvidaste tu contraseña?
                            </Link>

                            <Link href="/about" className="text-gray-400 hover:underline block">
                                ¿No tienes cuenta? Regístrate
                            </Link>
                        </div>

                    </form>

                </div>
            </div>

            <div className="w-[640px] bg-green-500 lg:block hidden">

            </div>
        </div>
    )
}