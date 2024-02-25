import { UserTokenPayload } from "@/types/userTokenType";
import jwt from 'jsonwebtoken'

export default class User {

    private token: string | null = null

    constructor() {
        this.token = localStorage.getItem("token");
    }

    public getUserPayload = (): UserTokenPayload | false => {
        if (!this.token) {
            return false;
        }

        const userPayload = jwt.decode(this.token) as UserTokenPayload;
        if (!userPayload || !userPayload.id || !userPayload.name || !userPayload.iat) {
            return false;
        }

        return userPayload;
    }
}