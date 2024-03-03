import React, { FC, InputHTMLAttributes, LegacyRef } from 'react'

interface InputType {
    type?: InputHTMLAttributes<HTMLInputElement>["type"]
    label: string,
    inputRef: LegacyRef<HTMLInputElement> | undefined,
}

const Input: FC<InputType> = ({ type = "text", label, inputRef }) => {

    return (
        <div className='flex flex-col gap-2 w-full'>
            <label className='text-lg roboto'>{label}</label>
            <input className='p-1 w-full font-roboto border-2 border-gray-300 rounded-md outline-none' type={type} ref={inputRef} />
        </div>
    );
};

export default Input;
