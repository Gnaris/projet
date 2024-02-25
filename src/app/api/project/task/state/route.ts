import Database from "@/database/Database"
import { NextResponse } from "next/server";

export const GET = async () => {
    const prismaClient = Database.getPrisma();
    const taskStates = await prismaClient.state.findMany()

    return NextResponse.json(taskStates, { status: 200 })
}