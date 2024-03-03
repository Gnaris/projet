import { UserTokenPayloadType } from "@/types/userTokenType";
import { createContext } from "react";

const UserContext = createContext<UserTokenPayloadType | undefined>(undefined)

export default UserContext