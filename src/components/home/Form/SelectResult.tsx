import CloseBtn from "@/components/global/CloseBtn";

type Props = {
    usersOnProject: { id: number, name: string, statusId: number, status: string }[]
    removeUserOnProject: (userId: number) => void
};
export default function SelectResult(props: Props) {
    return (
        <div className='flex justify-center items-center flex-col gap-8'>
            <label className='font-roboto font-medium text-lg'>Liste des utilisateurs dans le projet</label>
            <table className='w-full border-2 text-center overflow-hidden'>
                <thead className='bg-gray-300 border-b-2'>
                    <tr className='grid grid-cols-3'>
                        <td>Nom</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody className='block h-24 overflow-y-auto'>
                    {
                        props.usersOnProject.map((userSts, index) => {
                            return (
                                <tr className='grid grid-cols-3 border-b-2' key={index}>
                                    <td>{userSts.name}</td>
                                    <td>{userSts.status}</td>
                                    <td className='flex justify-center'><CloseBtn width='25px' height='25px' onClose={() => props.removeUserOnProject(userSts.id)} /></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};