import projectContext from '@/services/provider/projectContext';
import React, { useContext } from 'react';

const ProjectTableList = () => {

    const context = useContext(projectContext)

    return (
        <>
            {
                context.projects.map((project) => {
                    return (
                        <tbody key={project.id}>
                            <tr>
                                <td className='text-center'>{project.project.id}</td>
                                <td className='text-center'>{project.project.nom}</td>
                                <td className='text-center'>{project.project.description}</td>
                                <td className='text-center'>{project.status.status}</td>
                                <td className='text-center'>{project.project.tasks.length}</td>
                                <td className='text-center'><button onClick={() => context.setSelectedProject(project)}>Voir</button></td>
                            </tr>
                        </tbody>
                    )
                })
            }
        </>
    );
};

export default ProjectTableList;