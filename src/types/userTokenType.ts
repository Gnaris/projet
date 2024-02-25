export interface UserTokenPayload {
    id: number | undefined,
    name: string | undefined,
    roleId: number | undefined,
    role: string | undefined,
    iat: number | undefined
}