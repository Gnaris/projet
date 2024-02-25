import { TaskType } from "./TaskType"

export interface ProjectType {
    id: number,
    projectId: number,
    userId: number,
    statusId: number,
    project: {
        id: number,
        nom: string,
        description: string,
        tasks: TaskType[]
    },
    status: {
        id: number,
        status: string,
    }
}