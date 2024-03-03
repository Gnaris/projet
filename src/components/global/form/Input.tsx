type Props = {
    label: string
    type: HTMLInputElement["type"]
    name: string
    defaultValue?: string
    placeholder?: string
};
export default function Input(props: Props) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-roboto font-medium text-lg'>{props.label}</label>
            <input className='p-1 text-lg outline-none focus:border focus:border-gray-500' type={props.type} name={props.name} defaultValue={props.defaultValue} placeholder={props.placeholder} />
        </div>
    );
};