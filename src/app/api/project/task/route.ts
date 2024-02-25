import Database from "@/database/Database"
import { NextResponse } from "next/server"

const ERROR = {
    UNAUTHORIZED: { STATUS: 401, MSG: "INVALID ACCOUNT" }
}

export const DELETE = async (req: Request) => {

    const taskId = await req.json()

    const prismaClient = Database.getPrisma();
    await prismaClient.task.delete({
        where: {
            id: taskId
        }
    })

    return NextResponse.json({ msg: "deleted" })
}

export const PUT = async (req: Request) => {
    const taskData: {
        id: number,
        titre: string,
        description: string,
        effort: string,
        typeId: number,
        stateId: number
    } = await req.json();

    const prismaClient = Database.getPrisma()

    await prismaClient.task.update({
        where: {
            id: taskData.id
        },
        data: {
            titre: taskData.titre,
            description: taskData.description,
            effort: parseInt(taskData.effort),
            typeId: taskData.typeId,
            stateId: taskData.stateId
        }
    })

    return NextResponse.json({ msg: "ok" })
}

export const POST = async (req: Request) => {
    const taskData: {
        titre: string,
        description: string,
        effort: string,
        typeId: number,
        stateId: number,
        projectId: number,
    } = await req.json();

    const prismaClient = Database.getPrisma()

    const newTask = await prismaClient.task.create({
        include: {
            state: true,
            type: true,
        },
        data: {
            titre: taskData.titre,
            description: taskData.description,
            effort: parseInt(taskData.effort),
            stateId: taskData.stateId,
            typeId: taskData.typeId,
            projectId: taskData.projectId
        }
    })

    return NextResponse.json(newTask, { status: 200 })
}