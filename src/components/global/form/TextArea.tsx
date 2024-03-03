type Props = {
    title: string,
    name: string,
    defaultValue?: string,
    placeholder?: string,
};
export default function TextArea(props: Props) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='font-roboto font-medium text-lg'>{props.title}</label>
            <textarea className='p-1 text-lg outline-none focus:border focus:border-gray-500 resize-none' name={props.name} defaultValue={props.defaultValue} placeholder={props.placeholder} rows={10} />
        </div>
    );
};