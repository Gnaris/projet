'use client'

import { useParams } from "next/navigation";

export default function Page() {

    const params = useParams() as { id?: string }

    if (!params.id || typeof Number(params.id) != 'number' || isNaN(Number(params.id))) {
        throw new Error("Cette page doit uniquement contenir un id /home/project/[id]")
    }

    return (
        <div className="flex flex-col w-screen h-screen">
            <header className="flex items-center px-4 w-full h-16 bg-gradient-to-r from-indigo-950 to-blue-950 bg-repeat-space">
                <button className="w-1/12 h-1/2 bg-indigo-800 hover:bg-indigo-700 font-roboto text-white font-bold text-xl rounded-xl">Retour</button>
            </header>
            <main className="flex flex-grow w-full bg-indigo-950">

            </main>
        </div>
    );
};