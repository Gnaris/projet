import User from "@/entity/User"
import { UserTokenPayloadType } from "@/types/userTokenType"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const useUser = () => {

    const [user, setUser] = useState<UserTokenPayloadType>()
    const router = useRouter()

    useEffect(() => {
        const userPayload = new User().getUserPayloadOrDisconnect(router)
        if (userPayload) {
            setUser(userPayload)
        }
    }, [router])

    return {
        user
    } as const
}