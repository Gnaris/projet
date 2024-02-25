import { StateOfTask, TaskType, TypeOfTask } from "@/types/TaskType";

export const deleteTaskService = async (id: number) => {
    const response = await fetch("/api/project/task",
        {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token") as string
            },
            body: JSON.stringify(id)
        }
    ).then(res => res.json())
    return response;
}

export const updateTask = async (id: number, titre: string, description: string, effort: string, typeId: number, stateId: number) => {
    const response = await fetch("/api/project/task",
        {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem("token") as string
            },
            body: JSON.stringify({ id, titre, description, effort, typeId, stateId })
        }
    ).then(res => res.json())
    return response;
}

export const addTaskService = async (titre: string, description: string, effort: string, typeId: number, stateId: number, projectId: number) => {
    const response: TaskType = await fetch("/api/project/task",
        {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("token") as string
            },
            body: JSON.stringify({ titre, description, effort, typeId, stateId, projectId })
        }
    ).then(res => res.json())
    return response;
}

export const getTaskTypes = async (): Promise<TypeOfTask[]> => await fetch("/api/project/task/type").then(res => res.json())


export const getTaskStates = async (): Promise<StateOfTask[]> => fetch("/api/project/task/state").then(res => res.json())
