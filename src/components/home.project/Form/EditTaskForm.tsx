import ModalForm from "@/components/global/ModalForm";
import FormHeader from "@/components/global/form/FormHeader";
import Input from "@/components/global/form/Input";
import Submit from "@/components/global/form/Submit";
import TextArea from "@/components/global/form/TextArea";
import { updateTask } from "@/server/home.project.action";

type Props = {
    task: { id: number, name: string, description: string, effort: number, stateId: number, typeId: number }
    projectId: number,
    states: { id: number, state: string }[]
    types: { id: number, type: string }[]
    closeModal: () => void
};
export default function EditTaskForm(props: Props) {

    const editTask = async (formData: FormData) => {
        const taskName = formData.get("name") as string
        const description = formData.get("description") as string
        const effort = formData.get("effort") as string
        const state = formData.get("state") as string
        const type = formData.get("type") as string

        if (!isNaN(Number(effort)) && !isNaN(Number(state)) && !isNaN(Number(type))) {
            await updateTask(props.task.id, taskName, description, Number(effort), Number(state), Number(type), props.projectId)
            props.closeModal()
            location.reload()
        }
    }

    return (
        <ModalForm>
            <div className="flex flex-col p-4 px-6 gap-8 w-3/6 h-3/4 bg-zinc-100 rounded-xl">
                <FormHeader title='Créer une nouvelle tâche' closeModal={props.closeModal} />
                <form className='flex flex-col gap-8 overflow-y-auto' action={editTask}>
                    <Input label='Nom de la tâche' name='name' type='text' defaultValue={props.task.name} />
                    <TextArea title='Description' name='description' defaultValue={props.task.description} />
                    <Input label='Difficultés' name='effort' type='number' defaultValue={props.task.effort.toString()} />
                    <div className="flex justify-between min-h-12">
                        <select className='w-2/5 h-full outline-none' name="state" defaultValue={props.task.stateId}>
                            {props.states.length > 0 && props.states.map(state => <option key={state.id} value={state.id} >{state.state}</option>)}
                        </select>
                        <select className='w-2/5 h-full outline-none' name="type" defaultValue={props.task.typeId}>
                            {props.types.length > 0 && props.types.map(type => <option key={type.id} value={type.id}>{type.type}</option>)}
                        </select>
                    </div>
                    <Submit label='Modifier' />
                </form>
            </div>
        </ModalForm>
    );
};