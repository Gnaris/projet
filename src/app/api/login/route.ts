import Database from "@/database/Database";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const ERROR = {
  AUTH_FAILED: { STATUS: 401, MSG: "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard" },
  ACCOUNT_INVALID: { STATUS: 401, MSG: "Identifiant ou mot de passe incorrect" },
}

export const POST = async (req: Request) => {

  const reqData = await req.json() as { name: string | undefined, password: string | undefined }

  if (reqData.name === undefined || reqData.password === undefined) {
    return NextResponse.json(ERROR.AUTH_FAILED.MSG, { status: ERROR.AUTH_FAILED.STATUS })
  }

  if (reqData.name.length <= 0 || reqData.password.length <= 0) {
    return NextResponse.json(ERROR.ACCOUNT_INVALID.MSG, { status: ERROR.ACCOUNT_INVALID.STATUS })
  }

  const prisma = Database.getPrisma()
  const user = await prisma.user.findFirst({
    where: {
      name: reqData.name
    },
  })

  if (user === null) {
    return NextResponse.json(ERROR.ACCOUNT_INVALID.MSG, { status: ERROR.ACCOUNT_INVALID.STATUS })
  }

  const isSamePassword = await bcrypt.compare(reqData.password, user.password).then(result => result)

  if (!isSamePassword) {
    return NextResponse.json(ERROR.ACCOUNT_INVALID.MSG, { status: ERROR.ACCOUNT_INVALID.STATUS })
  }

  const userData = { id: user.id, name: user.name }

  const token = jwt.sign(userData, 'projet', { expiresIn: "1h" })

  return NextResponse.json(token, { status: 200 });
};
