import { updateProjectHeader } from '@/services/api/projectService';
import projectContext from '@/services/provider/projectContext';
import React, { useContext, useEffect, useRef } from 'react';

const TaskHeader = () => {

    const context = useContext(projectContext)

    if (context.selectedProject == undefined) {
        throw new Error("Pas de projet séléctionner")
    }

    const name = useRef<HTMLInputElement>(null)
    const description = useRef<HTMLTextAreaElement>(null)

    const editProjectHeader = async () => {
        if (name.current && description.current && context.selectedProject) {
            await updateProjectHeader(context.selectedProject.id, name.current.value, description.current.value);
            context.editProjectHeader(name.current.value, description.current.value)
        }
    }

    switch (context.selectedProject.statusId) {
        case 3: {
            return (
                <div className='flex column'>
                    <div>
                        <label>Projet selectionné : {context.selectedProject.project.nom}</label>
                        <label>Description : {context.selectedProject.project.description}</label>
                        <label>Votre Role : {context.selectedProject.status.status}</label>
                    </div>
                    <div>
                        <div>
                            <label>Nom du projet :</label>
                            <input type="text" ref={name} />
                        </div>
                        <div>
                            <label>Description du projet :</label>
                            <textarea ref={description} />
                        </div>
                        <button onClick={editProjectHeader}>Modifier</button>
                    </div>
                </div>
            );
        }

        default: {
            return (
                <>
                    <h2>Projet selectionné : {context.selectedProject.project.nom} / Description : {context.selectedProject.project.description} / Role : {context.selectedProject.status.status}</h2>
                </>
            );
        }
    }
};

export default TaskHeader;