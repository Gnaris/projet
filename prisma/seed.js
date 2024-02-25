const { PrismaClient } = require("@prisma/client");
const fs = require("fs")

const prisma = new PrismaClient();

async function load() {

  await prisma.user.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/user.json`))
  })

  await prisma.project.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/project.json`))
  })
  await prisma.status.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/status.json`))
  })

  await prisma.userOnProject.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/userOnProject.json`))
  })

  await prisma.state.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/state.json`))
  })
  await prisma.type.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/type.json`))
  })
  await prisma.task.createMany({
    data: JSON.parse(fs.readFileSync(`${__dirname}/seed/task.json`))
  })

}

load();
