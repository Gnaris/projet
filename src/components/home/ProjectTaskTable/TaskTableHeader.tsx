import projectContext from '@/services/provider/projectContext';
import React, { useContext } from 'react';

const TaskTableHeader = () => {

    const context = useContext(projectContext)

    if (!context.selectedProject) {
        throw new Error("Pas de projet séléctionner")
    }

    return (
        <thead>
            <tr>
                <td>ID Tache</td>
                <td>Titre</td>
                <td>Description</td>
                <td>Difficulté</td>
                <td>Type de tâche</td>
                <td>État</td>
                {
                    (context.selectedProject.statusId === 1 || context.selectedProject.statusId === 3) && (
                        <>
                            <td>Modifier</td>
                            <td>Supprimer</td>
                        </>
                    )
                }
            </tr>
        </thead>
    );
};

export default TaskTableHeader;