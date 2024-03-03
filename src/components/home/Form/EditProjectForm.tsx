import ModalForm from "@/components/global/ModalForm";
import useProject from "./hooks/useProject";
import { updateProject } from "@/server/home.action";
import FormHeader from "./components/FormHeader";
import Input from "./components/Input";
import TextArea from "./components/TextArea";
import SelectForm from "./components/SelectForm";
import SelectResult from "./components/SelectResult";
import Submit from "./components/Submit";

type Props = {
    project: { id: number, name: string, description: string }
    closeModal: () => void,
};
export default function EditProjectForm(props: Props) {

    const { userCtx, users, status, usersOnProject, selectUser, selectStatus, addUserOnProject, removeUserOnProject, } = useProject(props.project.id)

    const editProjet = async (formData: FormData) => {
        const projectNames = formData.get("name") as string
        const description = formData.get("description") as string
        if (projectNames && description && userCtx && userCtx.id) {
            await updateProject(props.project.id, projectNames, description, usersOnProject)
        }
        props.closeModal()
        location.reload()
    }

    return (
        <ModalForm>
            <div className="flex flex-col p-4 px-6 gap-8 w-3/6 h-3/4 bg-zinc-100 rounded-xl">
                <FormHeader title={`Éditer le projet nº ${props.project.id}`} closeModal={props.closeModal} />
                <form className='flex flex-col gap-8 overflow-y-auto' action={editProjet}>
                    <Input label='Nom du projet' name='name' defaultValue={props.project.name} type='text' placeholder='Faire de la pate a modeler' />
                    <TextArea title='Description' name='description' defaultValue={props.project.description} placeholder="C'est la base des bases" />
                    <SelectForm {...{ users, status, selectUser, selectStatus, addUserOnProject }} />
                    <SelectResult {...{ usersOnProject, removeUserOnProject }} />
                    <Submit label='Modifier' />
                </form>
            </div>
        </ModalForm>
    );
};