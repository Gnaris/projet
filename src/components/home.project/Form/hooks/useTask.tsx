import { getStates, getTypes } from "@/server/datalist.action"
import { ChangeEvent, useEffect, useState } from "react"

export const useTask = () => {

    const [states, setState] = useState<{ id: number, state: string }[]>([])
    const [types, setType] = useState<{ id: number, type: string }[]>([])

    useEffect(() => {
        (async () => {
            const states = await getStates();
            const types = await getTypes();
            setState(states)
            setType(types)
        })()
    }, [])

    return {
        states,
        types,
    }
}