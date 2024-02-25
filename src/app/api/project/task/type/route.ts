import Database from "@/database/Database"
import { NextResponse } from "next/server"

export const GET = async () => {
    const prisma = Database.getPrisma()
    const taskTypes = await prisma.type.findMany()

    return NextResponse.json(taskTypes, { status: 200 })
}