'use client';

import GanttChart from "@/components/ganttChart";
import Header from "@/components/header";
import Menu from "@/components/menu";
import { useUser } from "@/context/userContext";

export default function GanttPage() {
    const { user } = useUser();

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
                    <GanttChart />
                </div>

            </main>
        </div>
    );
}