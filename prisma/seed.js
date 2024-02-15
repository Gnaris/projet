const { PrismaClient } = require('@prisma/client')
const { users } = require('./seed/user.js')

const prisma = new PrismaClient()

async function load(){

    await prisma.$queryRaw`TRUNCATE user`;

    // await prisma.user.createMany({
    //     data : users
    // })
}

load()