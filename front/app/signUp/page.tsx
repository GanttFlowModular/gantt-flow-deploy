'use client';

import { handleSignIn, handleSignOut } from '../lib/auth';
import { useSession, signIn } from "next-auth/react";
import Button from "@/components/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { data: session } = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.push('/dashboard');
        }
    }, [session, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
    };

    return (
        <main className="flex h-screen">

            {session ? (
                <div>Redirecting to dashboard...</div>
            ) : (

                <>
                    <div className="flex-1 flex flex-col items-start justify-center">
                        <div className="ml-40">
                            <h1 className="font-bold text-[25px]">Registrate para continuar</h1>

                            <form onSubmit={handleSubmit} className='space-y-7'>
                                <Button
                                    icon="/signUpGoogle.svg"
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

                                <Button
                                    icon="/signUpButton.svg"
                                    iconWidth={500}
                                    iconHeight={64}
                                    bgColor="bg-transparent"
                                    border="border-none"
                                />

                                <div className="text-center space-y-4">
                                    <Link href="/login" className="text-gray-400 hover:underline block">
                                        ¿Ya tienes una cuenta? Inicia sesión
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center space-y-8 w-[700px] bg-green-500 border">
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

                        <div className='flex text-white text-xl font-semibold'>
                            <p>La solución que necesitas para tu proyecto</p>
                        </div>

                    </div>
                </>

            )}

        </main>
    );
}