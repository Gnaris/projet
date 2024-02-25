import React, { FC, useContext } from 'react';
import ProjectTableHeader from './ProjectTableHeader';
import ProjectTableList from './ProjectTableList';
import projectContext from '@/services/provider/projectContext';


type ProjectListType = {
    userId: number | undefined
}

const ProjectContainer: FC<ProjectListType> = ({ userId }) => {

    const context = useContext(projectContext)

    if (userId === undefined) {
        return <div>
            <p className='fs-32px'>Chargement en cours...</p>
        </div>
    }

    return (
        <div>
            <h1>Vos projets :</h1>
            <table border={3}>
                <ProjectTableHeader />
                <ProjectTableList key={context.projects.length} />
            </table>
        </div>
    );
};

export default ProjectContainer;