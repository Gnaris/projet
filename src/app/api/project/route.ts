import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken';
import { UserTokenPayload } from "@/types/userTokenType";
import Database from "@/database/Database";

const ERROR = {
    UNAUTHORIZED: { STATUS: 401, MSG: "INVALID ACCOUNT" }
}

export const POST = async (req: Request) => {

    const token = req.headers.get('authorization')

    if (!token) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    let userData: UserTokenPayload

    try {
        userData = jwt.verify(token, 'projet') as UserTokenPayload
    } catch (JsonWebTokenError) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    if (!userData || !userData.id || !userData.name || !userData.iat) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    const prisma = Database.getPrisma()
    const projects = await prisma.userOnProject.findMany({
        include: {
            project: {
                include: {
                    tasks: {
                        include: {
                            state: true,
                            type: true,
                        }
                    }
                }
            },
            status: true,
        },
        where: {
            userId: userData.id
        }
    })


    return NextResponse.json(projects, { status: 200 })
}

export const PUT = async (req: Request) => {

    const token = req.headers.get('authorization')

    if (!token) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    let userData: UserTokenPayload

    try {
        userData = jwt.verify(token, 'projet') as UserTokenPayload
    } catch (JsonWebTokenError) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    if (!userData || !userData.id || !userData.name || !userData.iat) {
        return NextResponse.json(ERROR.UNAUTHORIZED.MSG, { status: ERROR.UNAUTHORIZED.STATUS })
    }

    const reqData = await req.json() as { id: number, name: string, description: string }

    const prisma = Database.getPrisma();
    const updatedProject = await prisma.project.update({
        where: {
            id: reqData.id
        },
        data: {
            nom: reqData.name,
            description: reqData.description,
        }
    })

    return NextResponse.json(updatedProject, { status: 200 })
}