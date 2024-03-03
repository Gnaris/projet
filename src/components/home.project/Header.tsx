import { ProjectTaskType } from "@/types/ProjectType";
import { UserTokenPayloadType } from "@/types/userTokenType";
import Link from "next/link";

type Props = {
    project: ProjectTaskType | undefined
    user: UserTokenPayloadType | undefined
};
export default function Header(props: Props) {

    const showStatus = () => {
        const user = props.project?.users.find(user => user.id === user.id)
        let text = ""
        if (user) {
            text = user.status.status
        }
        if (props.project?.managerId === props.user?.id) {
            text = "Chef de projet"
        }

        return <h2 className="text-white text-lg font-medium font-poppins">{text}</h2>
    }

    return (
        <header className="flex items-center px-4 w-full min-h-16 bg-gradient-to-r from-indigo-950 to-blue-950 bg-repeat-space">
            <Link href="/home" className="flex justify-center items-center w-1/12 h-1/2 bg-indigo-800 hover:bg-indigo-700 font-roboto text-white font-bold text-xl rounded-xl">Retour</Link>
            <div className="flex flex-col justify-center items-center w-10/12">
                <h1 className="font-poppins text-white text-xl font-bold uppercase">{props.project?.nom}</h1>
                {showStatus()}
            </div>
        </header>
    );
};