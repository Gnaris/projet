import React, { FC } from 'react';

interface SubmitType {
    onSubmit: () => void
}

const Submit: FC<SubmitType> = ({ onSubmit }) => {
    return (
        <div className='bg-grey pointer' onClick={onSubmit}>
            <p>Se connecter</p>
        </div>
    );
};

export default Submit;