import { PrismaClient } from "@prisma/client"

export default class Database {

    public static prisma: PrismaClient | null = null

    public static getPrisma = () => {
        if (this.prisma == null) {
            this.prisma = new PrismaClient
        }
        return this.prisma
    }
}