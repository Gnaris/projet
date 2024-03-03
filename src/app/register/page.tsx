'use client'

import Input from '@/components/global/Input';
import ModalLoading from '@/components/global/ModalLoading';
import { register } from '@/server/auth.action';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

const Page = () => {

    const router = useRouter();

    const name = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const [formState, setFormState] = useState<{ error: string, isLoading: boolean }>({ error: "", isLoading: false })

    const submit = async () => {
        if (name.current != null && password.current != null) {

            setFormState(prev => ({ ...prev, isLoading: true }))
            await new Promise(res => setTimeout(res, 500))
            const { token, error } = await register(name.current.value, password.current.value)
            setFormState(prev => ({ ...prev, isLoading: false }))
            if (error) {
                setFormState(prev => ({ ...prev, error }))
            } else if (token) {
                setFormState(prev => ({ ...prev, error: "" }))
                localStorage.setItem("token", token)
                router.push("/home")
            } else {
                setFormState(prev => ({ ...prev, error: "Une erreur est survenue lors de l'inscirption. Veuillez réessayer plus tard" }))
            }
        }
    }

    return (
        <>
            <ModalLoading isLoading={formState.isLoading} />
            <div className="flex justify-center items-center h-screen bg-gray-200">
                <div className="flex justify-center items-center flex-col gap-8 p-8 h-3/5 w-1/4 bg-white rounded-lg">
                    <h1 className="text-3xl text-indigo-400 font-poppins uppercase font-medium">Inscription</h1>
                    <div className="flex justify-center items-center flex-col gap-4 w-3/5">
                        <Input label="Nom" inputRef={name} />
                        <Input type='password' label="Mot de passe" inputRef={password} />
                        <p className="text-red-400 text-center">{formState.error}</p>
                    </div>
                    <div className="flex justify-center items-center flex-col gap-2 w-full">
                        <button className='w-1/2 p-2 bg-indigo-400 rounded-3xl text-white uppercase font-bold' onClick={submit}>S&apos;inscrire</button>
                        <Link className="text-indigo-400 underline" href={"/"}>Se connecter</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;