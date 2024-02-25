
import React, { useContext } from 'react';
import TaskTableHeader from './TaskTableHeader';
import TaskTableList from './TaskTableList';
import TaskHeader from './TaskHeader';
import TaskForm from './TaskForm';
import projectContext from '@/services/provider/projectContext';

const TaskContainer = () => {

    const context = useContext(projectContext)

    return (
        <div>
            <TaskHeader />
            <div className='flex'>
                <h2>Liste des taches :</h2>
                {
                    (context.selectedProject?.statusId === 1 || context.selectedProject?.statusId === 3) &&
                    <button onClick={() => context.setTaskFormType("ADD")}>Ajouter une tache</button>
                }
            </div>
            <div className='flex space-between'>
                <table border={5}>
                    <TaskTableHeader />
                    <TaskTableList />
                </table>
                {
                    (context.selectedProject?.statusId === 1 || context.selectedProject?.statusId === 3) &&
                    <TaskForm type={context.taskFormType} />
                }
            </div>
        </div>
    );
};

export default TaskContainer;