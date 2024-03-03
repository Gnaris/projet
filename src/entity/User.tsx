import { UserTokenPayloadType } from "@/types/userTokenType";
import jwt from 'jsonwebtoken'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export default class User {

    private token: string | null = null

    constructor() {
        this.token = localStorage.getItem("token");
    }

    public getUserPayloadOrDisconnect = (router: AppRouterInstance): UserTokenPayloadType | void => {
        if (!this.token) {
            router.push("/")
            return;
        }

        const userPayload = jwt.decode(this.token) as UserTokenPayloadType;
        if (!userPayload || !userPayload.id || !userPayload.name || !userPayload.iat) {
            localStorage.removeItem("token")
            router.push("/")
            return;
        }

        return userPayload;
    }
}