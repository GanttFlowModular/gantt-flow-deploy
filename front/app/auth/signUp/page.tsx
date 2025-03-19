'use client';

import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/api';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await auth.createUser({ name, email, mobile, password });
            console.log('Registro exitoso:', response);
            router.push('/auth/login');
        } catch (err) {
            setError('Error al registrarse. Por favor, intenta de nuevo.');
            console.error(err);
        }
    };

    return (
        <main className="flex h-screen">
            {/* Sección del formulario */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h1 className="font-bold text-2xl mb-6 text-center">Regístrate para continuar</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label className="font-bold">Nombre</label>
                                <input
                                    type="text"
                                    placeholder="Escribe aquí tu nombre"
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Correo</label>
                                <input
                                    type="email"
                                    placeholder="Escribe aquí tu correo"
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Teléfono</label>
                                <input
                                    type="text"
                                    placeholder="Escribe aquí tu teléfono"
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="font-bold">Contraseña</label>
                                <input
                                    type="password"
                                    placeholder="Escribe aquí tu contraseña"
                                    className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <Button
                            icon="/signUpButton.svg"
                            iconWidth={500}
                            iconHeight={64}
                            bgColor="bg-transparent"
                            border="border-none"
                            type="submit"
                        />

                        <div className="text-center space-y-4">
                            <Link href="/auth/login" className="text-gray-400 hover:underline block">
                                ¿Ya tienes una cuenta? Inicia sesión
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Sección de la imagen */}
            <div className="hidden lg:flex flex-col justify-center items-center space-y-8 w-[700px] bg-green-500 border">
                <div>
                    <Image
                        className="dark:invert"
                        src="/logoSignUpLogin.svg"
                        alt="Logo de GanttFlow"
                        width={450}
                        height={207}
                        priority
                    />
                </div>

                <div className="flex text-white text-xl font-semibold">
                    <p>La solución que necesitas para tu proyecto</p>
                </div>
            </div>
        </main>
    );
}