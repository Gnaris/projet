import React, { FC, InputHTMLAttributes, LegacyRef } from 'react'

interface InputType {
    type?: InputHTMLAttributes<HTMLInputElement>["type"]
    label: string,
    inputRef: LegacyRef<HTMLInputElement> | undefined,
}

const Input: FC<InputType> = ({ type = "text", label, inputRef }) => {

    return (
        <div className='flex column'>
            <label>{label}</label>
            <input type={type} ref={inputRef} />
        </div>
    );
};

export default Input;
