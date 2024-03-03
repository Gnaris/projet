'use server'

import Database from "@/database/Database"

export const getUsers = async () => {

    const users = await Database.getPrisma().user.findMany({
        select: {
            id: true,
            name: true,
        },
    });

    return users;
};

export const getStatus = async () => {
    const status = await Database.getPrisma().status.findMany()
    return status;
}

export const getStates = async () => {
    const states = await Database.getPrisma().state.findMany()
    return states
}

export const getTypes = async () => {
    const types = await Database.getPrisma().type.findMany()
    return types
}