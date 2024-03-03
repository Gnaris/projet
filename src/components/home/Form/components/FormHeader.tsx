import CloseBtn from "@/components/global/CloseBtn";

type Props = {
    title: string,
    closeModal: () => void
};
export default function FormHeader(props: Props) {
    return (
        <div className='flex justify-between items-center'>
            <h3 className='font-poppins font-bold text-lg uppercase'>{props.title}</h3>
            <CloseBtn width='45px' height='45px' onClose={props.closeModal} />
        </div>
    );
};