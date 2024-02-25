import { deleteTaskService } from '@/services/api/taskService';
import projectContext from '@/services/provider/projectContext';
import { TaskType } from '@/types/TaskType';
import React, { useContext } from 'react';


const TaskTableList = () => {

    const context = useContext(projectContext)

    if (!context.selectedProject) {
        throw new Error("Pas de projet séléctionner")
    }

    const deleteTask = async (id: number) => {
        await deleteTaskService(id)
        context.deleteTask(id)
    }

    const selectTask = (task: TaskType) => {
        context.setTaskFormType("EDIT")
        context.setSelectedTask(task)
    }

    return (
        <>
            {
                context.selectedProject.project.tasks.map((task) => {
                    return (
                        <tbody key={task.id}>
                            <tr>
                                <td>{task.id}</td>
                                <td>{task.titre}</td>
                                <td>{task.description}</td>
                                <td>{task.effort}</td>
                                <td>{task.type.type}</td>
                                <td>{task.state.state}</td>
                                {
                                    context.selectedProject && (context.selectedProject.statusId === 1 || context.selectedProject.statusId === 3) && (
                                        <>
                                            <td><button onClick={() => selectTask(task)}>Modifier</button></td>
                                            <td><button onClick={() => deleteTask(task.id)}>Supprimer</button></td>
                                        </>
                                    )
                                }
                            </tr>
                        </tbody>
                    )
                })
            }
        </>
    );
};

export default TaskTableList;