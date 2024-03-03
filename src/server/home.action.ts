'use server'

import Database from "@/database/Database";

export const getUserProjects = async (userId: number) => {

    const data = await Database.getPrisma().project.findMany({
        include: {
            manager: {
                select: {
                    id: true,
                    name: true,
                }
            },
            tasks: true
        },
        where: {
            OR: [
                { managerId: userId },
                { users: { some: { userId } } }
            ]
        }
    });

    return data
}

export const createProject = async (projectName: string, description: string, managerId: number, usersOnProject: { id: number, name: string, statusId: number, status: string }[]) => {
    const data = await Database.getPrisma().project.create({
        data: {
            nom: projectName,
            description,
            managerId,
            users: {
                createMany: {
                    data: usersOnProject.map(user => ({ userId: user.id, statusId: user.statusId }))
                }
            }
        }
    })

    return data;
}

export const updateProject = async (projectId: number, projectName: string, description: string, usersOnProject: { id: number, name: string, statusId: number, status: string }[]) => {

    await Database.getPrisma().userOnProject.deleteMany({
        where: {
            projectId
        }
    })

    const data = await Database.getPrisma().project.update({
        where: {
            id: projectId,
        },
        data: {
            nom: projectName,
            description,
            users: {
                createMany: {
                    data: usersOnProject.map(user => ({ userId: user.id, statusId: user.statusId }))
                }
            }
        }
    })

    return data;
}

export const deleteProject = async (projectId: number) => {
    const result = await Database.getPrisma().project.delete({
        where: {
            id: projectId
        }
    })

    return result
}

export const getUsersNotInProject = async (managerId: number, projectId: number) => {

    const users = await Database.getPrisma().user.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            projects: {
                none: {
                    projectId: projectId,
                },
            },
            id: { not: managerId }
        }
    });

    return users;
};
export const getUsersInProject = async (managerId: number, projectId: number) => {

    const users = await Database.getPrisma().userOnProject.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true
                }
            },
            status: true
        },
        where: {
            projectId,
            userId: { not: managerId }
        }
    });

    return users;
};