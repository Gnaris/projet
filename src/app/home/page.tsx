'use client'

import { useEffect, useState } from "react";
import User from "@/entity/User";
import { useRouter } from "next/navigation";
import { UserTokenPayloadType } from "@/types/userTokenType";
import { getUserProjects } from "@/server/home.action";
import { ProjectType } from "@/types/ProjectType";
import { NavBar } from "@/components/global/NavBar";
import { Header } from "@/components/home/Header";
import { Content } from "@/components/home/Content";
import UserContext from "@/context/UserContext";

const Page = () => {

    const [user, setUser] = useState<UserTokenPayloadType>()
    const [projects, setProjects] = useState<ProjectType[]>([]);

    const router = useRouter()

    useEffect(() => {
        const result = new User().getUserPayloadOrDisconnect(router);
        if (result) {
            setUser(result);
            (async () => {
                if (result.id) {
                    const projects = await getUserProjects(result.id)
                    setProjects(projects)
                } else {
                    localStorage.removeItem("token")
                    router.push("/")
                }
            })()
        }

    }, [router])

    return (
        <UserContext.Provider value={user}>
            <div className="flex w-screen h-screen overflow-hidden">
                <div className="w-1/6 h-full">
                    <NavBar />
                </div>
                <div className="flex flex-col w-5/6 h-full bg-gradient-to-r from-indigo-900 to-indigo-950">
                    <div className="h-24">
                        <Header />
                    </div>
                    <div className="relative flex-grow">
                        <Content {...{ projects }} />
                    </div>
                </div>
            </div>
        </UserContext.Provider>
    );
};

export default Page