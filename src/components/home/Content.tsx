import { ProjectType } from '@/types/ProjectType';
import ViewSVG from '@/asset/view.svg'
import EditSVG from '@/asset/edit.svg'
import TrashSVG from '@/asset/trash.svg'
import Image from 'next/image';
import { AddProjectForm } from './Form/AddProjectForm';
import { use, useState } from 'react';
import UserContext from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import EditProjectForm from './Form/EditProjectForm';
import DeleteProjectForm from './Form/DeleteProjectForm';
import User from '@/entity/User';
type Props = {
    projects: ProjectType[]
};
export const Content = (props: Props) => {

    const userCtx = use(UserContext)
    const router = useRouter()
    const [addModal, setAddModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<{ id: number, name: string, description: string }>();
    const [deleteModal, setDeleteModal] = useState<{ id: number, name: string, description: string }>()

    if (!userCtx) {
        return <></>
    }

    const goToTaskPage = (projectId: number) => {
        const user = new User().getUserPayloadOrDisconnect(router)

        if (user) {
            router.push(`/home/project/${projectId}`)
        } else {
            localStorage.removeItem("token")
            router.push("/")
        }
    }

    return (
        <>
            {addModal && <AddProjectForm closeModal={() => setAddModal(false)} />}
            {editModal && <EditProjectForm project={editModal} closeModal={() => setEditModal(undefined)} />}
            {deleteModal && <DeleteProjectForm project={deleteModal} closeModal={() => setDeleteModal(undefined)} />}
            <div className='flex gap-12 flex-col p-10 h-full'>
                <div className='w-full h-12'>
                    <button className='w-48 h-full bg-gray-800 hover:bg-gray-700 text-white font-roboto font-medium uppercase' onClick={() => setAddModal(true)}>+ projet</button>
                </div>
                <table className='flex flex-col flex-grow min-h-0 border border-zinc-200/25 overflow-hidden'>
                    <thead className='grid h-12 bg-zinc-500/25 border-b-2 border-zinc-200/25'>
                        <tr className='grid grid-cols-6 items-center text-white font-poppins uppercase font-bold text-center'>
                            <td>ID</td>
                            <td>Nom</td>
                            <td>Description</td>
                            <td>Nombre de tâche</td>
                            <td>Chef de projet</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody className='flex-grow max-h-[600px] text-gray-400 text-center font-roboto font-medium overflow-y-auto'>
                        {props.projects.map((p, index) => (
                            <tr key={index} className='grid grid-cols-6 items-center py-4 bg-zinc-600/25 border-b border-zinc-200/25'>
                                <td>{p.id}</td>
                                <td>{p.nom}</td>
                                <td>{p.description}</td>
                                <td>{p.tasks.length}</td>
                                <td>{(p.managerId === userCtx.id ? "Vous" : p.manager.name)}</td>
                                <td className='flex justify-center items-center gap-4'>
                                    {
                                        p.managerId === userCtx.id &&
                                        <>
                                            <Image className='cursor-pointer' src={EditSVG} alt='view' width={25} height={25} onClick={() => setEditModal({ id: p.id, name: p.nom, description: p.description })} />
                                            <Image className='cursor-pointer' src={TrashSVG} alt='view' width={25} height={25} onClick={() => setDeleteModal({ id: p.id, name: p.nom, description: p.description })} />
                                        </>
                                    }
                                    <Image src={ViewSVG} className='cursor-pointer' alt='view' width={25} height={25} onClick={() => goToTaskPage(p.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};