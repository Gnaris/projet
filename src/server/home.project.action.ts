'use server'

import Database from "@/database/Database"
import { ProjectTaskType } from "@/types/ProjectType"
import { revalidatePath } from "next/cache"

export const getProjectTask = async (projectId: number) => {
    const project: ProjectTaskType | null = await Database.getPrisma().project.findFirst({
        include: {
            tasks: {
                include: {
                    state: true,
                    type: true,
                }
            },
            users: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                    status: true,
                }
            },
        },
        where: {
            id: projectId,
        },
    })

    return project
}

export const deleteTask = async (taskId: number) => {
    const result = await Database.getPrisma().task.delete({
        where: {
            id: taskId
        }
    })

    return result
}

export const createTask = async (taskName: string, description: string, effort: number, stateId: number, typeId: number, projectId: number) => {
    const result = Database.getPrisma().task.create({
        data: {
            titre: taskName,
            description,
            effort,
            stateId,
            typeId,
            projectId
        }
    })

    return result
}

export const updateTask = async (taskId: number, taskName: string, description: string, effort: number, stateId: number, typeId: number, projectId: number) => {
    const result = Database.getPrisma().task.update({
        where: {
            id: taskId
        },
        data: {
            titre: taskName,
            description,
            effort,
            stateId,
            typeId,
            projectId
        }
    })

    return result
}