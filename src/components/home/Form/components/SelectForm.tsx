import { ChangeEvent, MouseEvent } from "react";

type Props = {
    users: { id: number, name: string }[]
    status: { id: number, status: string }[]
    selectUser: (e: ChangeEvent<HTMLSelectElement>) => void
    selectStatus: (e: ChangeEvent<HTMLSelectElement>) => void
    addUserOnProject: (e: MouseEvent<HTMLSpanElement>) => void
};
export default function SelectForm(props: Props) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-roboto font-medium text-lg'>Ajouter des personnes dans votre projet</label>
            <div className='flex gap-8 h-10'>
                <select className='w-2/5 h-full outline-none' onChange={props.selectUser}>
                    {props.users.length > 0 && props.users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                <select className='w-2/5 h-full outline-none' onChange={props.selectStatus}>
                    {props.status.map(stts => <option key={stts.id} value={stts.id}>{stts.status}</option>)}
                </select>
                <span className='flex justify-center items-center w-1/5 h-full bg-green-500 hover:bg-green-400 text-white font-bold font-roboto rounded-full cursor-pointer' onClick={props.addUserOnProject}>Ajouter</span>
            </div>
        </div>
    );
};