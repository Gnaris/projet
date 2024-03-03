type Props = {
    label: string
};
export default function Submit(props: Props) {
    return (
        <div className='flex justify-center'>
            <input className='p-2 px-12 h-full text-lg outline-none text-white font-bold bg-blue-900 hover:bg-blue-800 rounded-xl cursor-pointer' type='submit' value={props.label} />
        </div>
    );
};