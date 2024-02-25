import Input from '@/components/global/Input';
import { addTaskService, updateTask } from '@/services/api/taskService';
import projectContext from '@/services/provider/projectContext';
import { StateOfTask, TypeOfTask } from '@/types/TaskType';
import { title } from 'process';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';

type TaskFormType = {
    type: "ADD" | "EDIT"
}


const TaskForm: FC<TaskFormType> = ({ type }) => {

    const context = useContext(projectContext)

    const title = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLInputElement>(null)
    const effort = useRef<HTMLInputElement>(null)
    const [taskType, setTaskType] = useState<TypeOfTask | undefined>(context.taskTypes[0])
    const [taskState, setTaskState] = useState<StateOfTask | undefined>(context.taskStates[0])

    const addTask = async () => {
        if (title.current && description.current && effort.current && context.selectedProject && taskState && taskType) {
            const newTask = await addTaskService(title.current.value, description.current.value, effort.current.value, taskType.id, taskState.id, context.selectedProject.project.id)
            context.addTask(newTask)
            title.current.value = '';
            description.current.value = '';
            effort.current.value = '';
            setTaskType(context.taskTypes[0]);
            setTaskState(context.taskStates[0]);
        }
    }

    const editTask = async () => {
        if (title.current && description.current && effort.current && context.selectedTask) {
            const titre = title.current.value === "" ? context.selectedTask.titre : title.current.value
            const desc = description.current.value === "" ? context.selectedTask.description : description.current.value
            const eff = effort.current.value === "" ? context.selectedTask.effort.toString() : effort.current.value
            const type = taskType === undefined ? context.selectedTask.type : taskType
            const state = taskState === undefined ? context.selectedTask.state : taskState
            updateTask(context.selectedTask.id, titre, desc, eff, type.id, state.id)
            context.editTask(titre, desc, parseInt(eff), type, state)
            title.current.value = '';
            description.current.value = '';
            effort.current.value = '';
            setTaskType(context.taskTypes[0]);
            setTaskState(context.taskStates[0]);
        }
    }


    switch (type) {
        case "ADD": {
            return (
                <div className='flex column'>
                    <h1>Ajouter une nouvelle tâche pour ce projet</h1>
                    <Input label='Titre' inputRef={title} />
                    <Input label='Description' inputRef={description} />
                    <Input type='number' label='Difficulté' inputRef={effort} />
                    <label>
                        Type de tâche :
                        <select onChange={e => setTaskType(context.taskTypes.find(t => t.id.toString() == e.target.value))}>
                            {
                                context.taskTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)
                            }
                        </select>
                    </label>
                    <label>
                        État de la tâche :
                        <select onChange={e => setTaskState(context.taskStates.find(t => t.id.toString() == e.target.value))}>
                            {
                                context.taskStates.map(state => <option key={state.id} value={state.id}>{state.state}</option>)
                            }
                        </select>
                    </label>
                    <button onClick={addTask}>Ajouter</button>
                </div>
            )
        }

        case "EDIT": {

            if (context.selectedTask === undefined) {
                return (
                    <div>

                    </div>
                )
            }

            return (
                <div className='flex column'>
                    <h1>Modifier la tache numéro : {context.selectedTask.id}</h1>
                    <Input label='Titre' inputRef={title} />
                    <Input label='Description' inputRef={description} />
                    <Input type='number' label='Difficulté' inputRef={effort} />
                    <label>
                        Type de tâche :
                        <select onChange={e => setTaskType(context.taskTypes.find(t => t.id.toString() == e.target.value))}>
                            {
                                context.taskTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)
                            }
                        </select>
                    </label>
                    <label>
                        État de la tâche :
                        <select onChange={e => setTaskState(context.taskStates.find(t => t.id.toString() == e.target.value))}>
                            {
                                context.taskStates.map(state => <option key={state.id} value={state.id}>{state.state}</option>)
                            }
                        </select>
                    </label>
                    <button onClick={editTask}>Modifier</button>
                </div>
            )
        }

        default: {
            throw new Error("Veuillez spécifiez le type ADD ou EDIT pour le composant TaskForm. 😎")
        }
    }
};

export default TaskForm;