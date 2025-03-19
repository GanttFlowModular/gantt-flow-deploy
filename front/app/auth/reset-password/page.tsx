'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/button';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@/app/lib/api';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            const data = await auth.resetPassword(token!, newPassword);
            setMessage(data.message);
            router.push('/auth/login');
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Error al restablecer la contraseña');
            } else {
                setError('Error desconocido al restablecer la contraseña');
            }
            console.error(err);
        }
    };

    return (
        <main className="flex h-screen">
            {/* Sección del formulario */}
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <h1 className="font-bold text-2xl mb-6 text-center">Restablecer contraseña</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="font-bold">Nueva contraseña</label>
                            <input
                                type="password"
                                placeholder="Escribe tu nueva contraseña"
                                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="font-bold">Confirmar contraseña</label>
                            <input
                                type="password"
                                placeholder="Confirma tu nueva contraseña"
                                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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