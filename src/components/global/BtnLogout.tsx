import { useRouter } from 'next/navigation';
import React from 'react';

const BtnLogout = () => {

    const router = useRouter()

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/")
    }

    return (
        <button onClick={logout}>Se deconnecter</button>
    );
};

export default BtnLogout;