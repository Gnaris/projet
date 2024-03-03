import UserContext from "@/context/UserContext";
import { getStatus, getUsers } from "@/server/datalist.action";
import { getUsersInProject, getUsersNotInProject } from "@/server/home.action";
import { ChangeEvent, use, useEffect, useState } from "react";

export default function useProject(projectId?: number) {
    const userCtx = use(UserContext)
    const [users, setUsers] = useState<{ id: number, name: string }[]>([])
    const [status, setStatus] = useState<{ id: number; status: string; }[]>([])

    const [usersOnProject, setUsersOnProject] = useState<{ id: number, name: string, statusId: number, status: string }[]>([])

    const [selectedUser, setSelectedUser] = useState<{ id: number, name: string }>()
    const [selectedStatus, setSelectedStatus] = useState<{ statusId: number, status: string }>()

    useEffect(() => {
        (async () => {
            if (userCtx && userCtx.id) {
                let users: { id: number, name: string }[] = [];
                if (projectId) {
                    users = await getUsersNotInProject(userCtx.id, projectId)
                    const usersOnProject = await getUsersInProject(userCtx.id, projectId)
                    setUsersOnProject(usersOnProject.map(user => ({ id: user.userId, name: user.user.name, statusId: user.statusId, status: user.status.status })))
                } else {
                    users = await getUsers()
                }
                const status = await getStatus()
                const filteredUser = users.filter(user => user.id != userCtx.id)
                setUsers(filteredUser)
                setStatus(status)
                setSelectedUser(filteredUser.length > 0 ? { id: filteredUser[0].id, name: filteredUser[0].name } : undefined)
                setSelectedStatus({ statusId: status[0].id, status: status[0].status })
            }
        })()
    }, [userCtx, projectId])

    const addUserOnProject = () => {
        if (userCtx && selectedUser && selectedStatus) {
            setUsersOnProject(prev => [...prev, ({ ...selectedUser, ...selectedStatus })])
            const newUsers = users.filter(user => user.id != selectedUser.id)
            setUsers(newUsers)
            if (newUsers.length > 0) {
                setSelectedUser({ id: newUsers[0].id, name: newUsers[0].name })
            } else {
                setSelectedUser(undefined)
            }
        }
    }

    const selectUser = (e: ChangeEvent<HTMLSelectElement>) => {
        if (users.length > 0) {
            const user = users.find(user => user.id === Number(e.target.value))
            if (user) {
                setSelectedUser({ id: user.id, name: user.name })
            }
        }
    }

    const selectStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        if (users.length > 0) {
            const sts = status.find(sts => sts.id === Number(e.target.value))
            if (sts) {
                setSelectedStatus({ statusId: sts.id, status: sts.status })
            }
        }
    }

    const removeUserOnProject = (userId: number) => {
        const findUser = usersOnProject.find(user => user.id === userId)
        if (findUser) {
            setUsers(prev => [...prev, { id: findUser.id, name: findUser.name }])
            setUsersOnProject(usersOnProject.filter(user => user.id != userId))
            setSelectedUser(prev => (prev ? prev : findUser))
        }
    }

    return {
        userCtx,
        users,
        status,
        usersOnProject,
        selectUser,
        selectStatus,
        addUserOnProject,
        removeUserOnProject,
    } as const
}