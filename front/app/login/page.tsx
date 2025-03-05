'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import Button from '@/components/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Iniciando sesión con:', email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">Iniciar sesión</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="px-4 py-2 border rounded-lg"
        />
        {/* Botón de login con Google */}
        <Button
            text="Iniciar sesión con Google"
            bgColor="bg-red-500 text-white"
            border="border border-red-700"
            hover="hover:bg-red-400"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            redirectTo="" // Se añade para evitar error de TypeScript
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}


