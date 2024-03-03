import ModalForm from "@/components/global/ModalForm";
import { deleteTask } from "@/server/home.project.action";

type Props = {
    task: { id: number, name: string },
    closeModal: () => void
};
export default function DeleteTaskForm(props: Props) {


    const removeTask = async () => {
        await deleteTask(props.task.id)
        props.closeModal()
        location.reload()
    }

    return (
        <ModalForm>
            <div className="flex justify-between items-center flex-col p-4 px-6 w-1/4 h-2/6 bg-zinc-100 rounded-xl">
                <h1 className="text-2xl font-poppins">Suppression de la tâche</h1>
                <div className="w-full text-lg text-center font-roboto">
                    <p>Supprimer cette tâche est irréversible</p>
                    <p>ID de la tâche : {props.task.id}</p>
                    <p>Nom de la tâche : {props.task.name}</p>
                </div>
                <div className="flex justify-around items-center w-full h-1/6 font-roboto">
                    <button className="w-2/5 h-full bg-gray-400 hover:bg-gray-300 text-zinc-600 rounded-full" onClick={props.closeModal}>Annuler</button>
                    <button className="w-2/5 h-full bg-red-500 hover:bg-red-400 text-white rounded-full" onClick={() => removeTask()}>Supprimer</button>
                </div>
            </div>
        </ModalForm>
    );
};