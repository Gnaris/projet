type Props = {
    children?: React.ReactNode
};
export default function ModalForm(props: Props) {
    return (
        <div className="absolute flex justify-center items-center w-full h-full bg-zinc-800/75">
            {props.children}
        </div>
    );
};