'use client';

import Header from "@/components/header";
import Menu from "@/components/menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from '@/context/userContext';
import { formatDate } from '@/utils/dateFormat';

export default function Home() {
    const router = useRouter();
    const [date, setDate] = useState('');
    const { user } = useUser();

    useEffect(() => {
        setDate((formatDate()));
    }, [router]);


    return (
        <div className="min-h-screen flex flex-col m-4 mx-4">
            <header>
                <Header user={user} />
            </header>

            <main className="flex flex-row justify-start flex-grow">
                <div>
                    <Menu user={user} />
                </div>

                <div className="flex flex-col items-center ml-52">
                    <p className="mt-14 font-semibold">{date}</p>
                    <h1 className="text-7xl mt-4">Hola, {user?.name}</h1>
                </div>

            </main>
        </div>
    )

}