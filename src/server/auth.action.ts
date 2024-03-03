'use server'

import Database from "@/database/Database";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const ERROR = {
    AUTH_FAILED: { token: null, error: "Une erreur est survenue lors de l'authentification. Veuillez réessayer plus tard" },
    ACCOUNT_INVALID: { token: null, error: "Identifiant ou mot de passe incorrect" },
    ACCOUNT_EXIST: { token: null, error: "Cette identifiant existe déjà. Veuillez réessayer un autre" },
}

export const login = async (name?: string | null, password?: string | null) => {

    if (name === undefined || name === null || password == undefined || password === null) {
        return ERROR.AUTH_FAILED
    }
    if (name.length <= 0 || password.length <= 0) {
        return ERROR.ACCOUNT_INVALID
    }

    const user = await Database.getPrisma().user.findFirst({
        where: {
            name
        },
    })

    if (user === null) {
        return ERROR.ACCOUNT_INVALID
    }

    const isSamePassword = await bcrypt.compare(password, user.password).then(result => result)

    if (!isSamePassword) {
        return ERROR.ACCOUNT_INVALID
    }

    const userData = { id: user.id, name: user.name }

    const token = jwt.sign(userData, process.env.JWT_SIGN)

    return { token, error: null }
};

export const register = async (name: string, password: string) => {

    if (name === undefined || name === null || password == undefined || password === null) {
        return ERROR.AUTH_FAILED
    }
    if (name.length <= 0 || password.length <= 0) {
        return ERROR.ACCOUNT_INVALID
    }

    const userExist = await Database.getPrisma().user.count({
        where: {
            name
        }
    })

    if (userExist) {
        return ERROR.ACCOUNT_EXIST
    } else {
        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT))
        const newUser = await Database.getPrisma().user.create({
            data: {
                name,
                password: hashedPassword,
            }
        })
        const token = jwt.sign({ id: newUser.id, name: newUser.name }, process.env.JWT_SIGN)
        return { token, error: null }
    }
}