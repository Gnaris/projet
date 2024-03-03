type Props = {
    width: string,
    height: string,
    onClose: () => void
};
export default function CloseBtn(props: Props) {
    return (
        <div className="group cursor-pointer" onClick={props.onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 512 512">
                <path className="fill-current text-gray-500 group-hover:text-red-500 cursor-pointer"
                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m86.63 272L320 342.63l-64-64l-64 64L169.37 320l64-64l-64-64L192 169.37l64 64l64-64L342.63 192l-64 64Z" />
            </svg>
        </div>
    );
};