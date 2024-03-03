import Image from 'next/image';
import React, { FC } from 'react';
import Loader from '@/asset/loader.gif'


type ModalLoadingType = {
    isLoading: boolean
}

const ModalLoading: FC<ModalLoadingType> = ({ isLoading }) => {
    return (
        <div className={(isLoading ? 'flex' : 'hidden') + ' fixed justify-center items-center h-screen w-screen bg-zinc-900/90'}>
            <Image src={Loader} alt='loader' width={100} height={100} />
        </div>
    );
};

export default ModalLoading;