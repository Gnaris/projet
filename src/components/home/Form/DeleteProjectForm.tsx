import ModalForm from "@/components/global/ModalForm";
import { deleteProject } from "@/server/home.action";

type Props = {
    project: { id: number, name: string, description: string }
    closeModal: () => void
};
export default function DeleteProjectForm(props: Props) {

    const removeProject = async () => {
        await deleteProject(props.project.id)
        props.closeModal()
        location.reload()
    }

    return (
        <ModalForm>
            <div className="flex justify-between items-center flex-col p-4 px-6 w-1/4 h-2/6 bg-zinc-100 rounded-xl">
                <h1 className="text-2xl font-poppins">Suppression du projet</h1>
                <div className="w-full text-lg text-center font-roboto">
                    <p>Supprimer ce projet est irréversible</p>
                    <p>ID du projet : {props.project.id}</p>
                    <p>Nom du projet : {props.project.name}</p>
                </div>
                <div className="flex justify-around items-center w-full h-1/6 font-roboto">
                    <button className="w-2/5 h-full bg-gray-400 hover:bg-gray-300 text-zinc-600 rounded-full" onClick={props.closeModal}>Annuler</button>
                    <button className="w-2/5 h-full bg-red-500 hover:bg-red-400 text-white rounded-full" onClick={() => removeProject()}>Supprimer</button>
                </div>
            </div>
        </ModalForm>
    );
};