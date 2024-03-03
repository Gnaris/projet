import { createProject } from '@/server/home.action';
import useProject from './hooks/useProject';
import FormHeader from './components/FormHeader';
import Input from './components/Input';
import TextArea from './components/TextArea';
import SelectForm from './components/SelectForm';
import SelectResult from './components/SelectResult';
import Submit from './components/Submit';
import ModalForm from '@/components/global/ModalForm';
import { revalidatePath } from 'next/cache';


type Props = {
    closeModal: () => void
};

export const AddProjectForm = (props: Props) => {

    const { userCtx, users, status, usersOnProject, selectUser, selectStatus, addUserOnProject, removeUserOnProject, } = useProject()

    const addProjet = async (formData: FormData) => {
        const projectNames = formData.get("name") as string
        const description = formData.get("description") as string
        if (projectNames && description && userCtx && userCtx.id) {
            await createProject(projectNames, description, userCtx.id, usersOnProject)
            revalidatePath("/")
        }
        props.closeModal()
    }

    return (
        <ModalForm>
            <div className="flex flex-col p-4 px-6 gap-8 w-3/6 h-3/4 bg-zinc-100 rounded-xl">
                <FormHeader title='Créer un nouveau projet' closeModal={props.closeModal} />
                <form className='flex flex-col gap-8 overflow-y-auto' action={addProjet}>
                    <Input label='Nom du projet' name='name' type='text' placeholder='Faire de la pate a modeler' />
                    <TextArea title='Description' name='description' placeholder="C'est la base des bases" />
                    <SelectForm {...{ users, status, selectUser, selectStatus, addUserOnProject }} />
                    <SelectResult {...{ usersOnProject, removeUserOnProject }} />
                    <Submit label='Créer' />
                </form>
            </div>
        </ModalForm>
    );
};
