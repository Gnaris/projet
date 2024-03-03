import { getStates, getTypes } from "@/server/datalist.action";
import { ProjectTaskType } from "@/types/ProjectType";
import { UserTokenPayloadType } from "@/types/userTokenType";
import { useEffect, useState } from "react";
import DeleteTaskForm from "./Form/DeleteTaskForm";
import AddTaskForm from "./Form/AddTaskForm";
import { useTask } from "./Form/hooks/useTask";
import EditTaskForm from "./Form/EditTaskForm";

type Props = {
    project: ProjectTaskType | undefined
    user: UserTokenPayloadType | undefined
};
export default function Content(props: Props) {

    const { types, states } = useTask()

    const [addModal, setAddModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState<{ id: number, name: string }>()
    const [editModal, setEditModal] = useState<{ id: number, name: string, description: string, effort: number, stateId: number, typeId: number }>()


    return (
        <>
            {addModal && props.project && <AddTaskForm {...{ types, states }} projectId={props.project.id} closeModal={() => setAddModal(false)} />}
            {editModal && props.project && <EditTaskForm task={editModal} {...{ types, states }} projectId={props.project.id} closeModal={() => setEditModal(undefined)} />}
            {deleteModal && <DeleteTaskForm task={deleteModal} closeModal={() => setDeleteModal(undefined)} />}
            <main className="flex justify-around flex-col flex-grow w-full h-full bg-indigo-950 overflow-hidden">
                {
                    (props.project?.users.find(u => u.userId === props.user?.id)?.status.status != "Lecture" || props.project?.managerId === props.user?.id) &&
                    <div className='w-full h-12 px-24'>
                        <button className='w-48 h-full bg-gray-900 hover:bg-gray-700 text-white font-roboto font-medium uppercase' onClick={() => setAddModal(true)}>+ Tache</button>
                    </div>
                }
                {types.map((type, index) => {
                    return (
                        <div className="flex flex-col gap-8" key={index}>
                            <div className="flex justify-center">
                                <h1 className="text-white text-3xl font-poppins underline">Tâche {type.type}</h1>
                            </div>
                            <div className="flex justify-center h-full">
                                {
                                    states.map((stt, index) => {
                                        return (
                                            <div className='flex justify-center w-full h-1/4' key={index}>
                                                <table className="flex flex-col w-3/4 h-72 border border-indigo-500 text-white overflow-hidden">
                                                    <thead className="flex justify-center items-center bg-indigo-900 font-poppins font-medium min-h-12 max-h-12 border-b border-indigo-500">
                                                        <tr>
                                                            <td>{stt.state}</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="flex flex-col flex-grow gap-5 p-4 h-[400px] bg-indigo-900/50 overflow-y-auto">
                                                        {
                                                            props.project?.tasks.sort((a, b) => a.effort - b.effort).map((task, index) => {
                                                                if (task.stateId === stt.id && type.id === task.typeId) {
                                                                    return (
                                                                        <tr className="flex flex-col p-2 bg-indigo-900 hover:bg-indigo-800 cursor-pointer rounded-lg" key={index}>
                                                                            <td>Titre : {task.titre}</td>
                                                                            <td>Description : {task.description}</td>
                                                                            <td>Difficultés : {task.effort}</td>
                                                                            {

                                                                                (props.project?.users.find(u => u.userId === props.user?.id)?.status.status != "Lecture" || props.project?.managerId === props.user?.id) &&
                                                                                <>
                                                                                    <td className="flex justify-around items-center gap-2 h-20">
                                                                                        <button className="w-1/2 h-1/2 bg-indigo-950 hover:bg-indigo-600" onClick={() => setEditModal({ id: task.id, name: task.titre, description: task.description, effort: task.effort, stateId: task.stateId, typeId: task.typeId })}>Modifier</button>
                                                                                        <button className="w-1/2 h-1/2 bg-indigo-950 hover:bg-red-500" onClick={() => setDeleteModal({ id: task.id, name: task.titre })}>Supprimer</button>
                                                                                    </td>
                                                                                </>
                                                                            }
                                                                        </tr>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </main>
        </>
    );
};