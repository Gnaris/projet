import UserContext from "@/context/UserContext";
import { use } from "react";

type Props = {

};
export const Header = (props: Props) => {

    const userCtx = use(UserContext)

    return (
        <div className='flex justify-between items-center px-16 h-full border-b text-white font-semibold'>
            <h2 className='text-2xl uppercase'>Vos projets</h2>
            <div className='text-xl'>
                <div className='flex justify-center items-center gap-2'>
                    {
                        userCtx && <>
                            <p className=''>Bonjour</p>
                            <label className='uppercase'>{userCtx.name}</label>
                        </>
                    }
                </div>
                {
                    userCtx && <label className='uppercase'>ID : {userCtx.id}</label>
                }
            </div>
        </div>
    );
};