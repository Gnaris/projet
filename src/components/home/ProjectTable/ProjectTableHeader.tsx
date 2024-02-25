import React from 'react';

const ProjectTableHeader = () => {
    return (
        <thead>
            <tr>
                <td className='text-center'>ID</td>
                <td className='text-center'>Nom</td>
                <td className='text-center'>Description</td>
                <td className='text-center'>Rôle</td>
                <td className='text-center'>Nombre de tâches</td>
                <td className='text-center'>Action</td>
            </tr>
        </thead>
    );
};

export default ProjectTableHeader;