'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/app/lib/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const data = await auth.sendRecoveryEmail(email);
            setMessage(data.message);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Error al enviar la solicitud');
            } else {
                setError('Error desconocido al enviar la solicitud');
            }
            console.error(err);
        }
    };

    return (
        <main className="flex h-screen">
            {/* Sección del formulario */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h1 className="font-bold text-2xl mb-6 text-center">Recuperar contraseña</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
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

                        {message && <p className="text-green-500 text-center">{message}</p>}
                        {error && <p className="text-red-500 text-center">{error}</p>}

                        <Button
                            icon="/loginButton.svg"
                            iconWidth={500}
                            iconHeight={64}
                            bgColor="bg-transparent"
                            border="border-none"
                            type="submit"
                        />

                        <div className="text-center space-y-4">
                            <Link href="/auth/login" className="text-gray-400 hover:underline block">
                                Volver al inicio de sesión
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