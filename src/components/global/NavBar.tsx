// @flow 
import Link from 'next/link';
import * as React from 'react';
type Props = {

};
export const NavBar = (props: Props) => {
    return (
        <nav className='flex items-center flex-col items-center w-full h-full bg-indigo-950 text-white'>
            <div className='flex justify-center items-center w-full h-1/6'>
                <h1 className='text-4xl uppercase font-poppins font-semibold'>Projet</h1>
            </div>
            <ul className='w-full h-4/6 font-roboto text-xl font-medium cursor-pointer'>
                <li className='p-5 bg-gradient-to-r from-slate-600 to-indigo-950'>Vos Projets</li>
            </ul>
            <div className='flex justify-center items-center w-full h-1/6 font-roboto text-xl font-medium '>
                <Link href={"/"} className='flex justify-center items-center w-3/4 p-4 bg-gradient-to-r from-slate-600 to-indigo-900 rounded-full hover:bg-blue-800'>
                    Se déconnecter
                </Link>
            </div>
        </nav >
    );
};