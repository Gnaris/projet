'use client'

import Content from "@/components/home.project/Content";
import Header from "@/components/home.project/Header";
import { useUser } from "@/hooks/useUser";
import { getProjectTask } from "@/server/home.project.action";
import { ProjectTaskType } from "@/types/ProjectType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const params = useParams() as { id?: string }

    if (!params.id || typeof Number(params.id) != 'number' || isNaN(Number(params.id))) {
        throw new Error("Cette page doit uniquement contenir un id /home/project/[id]")
    }

    const { user } = useUser()
    const [project, setProject] = useState<ProjectTaskType>()

    useEffect(() => {
        (async () => {
            if (params.id && user && user.id) {
                const project: ProjectTaskType | null = await getProjectTask(Number(params.id))
                if (project != null) {
                    setProject(project)
                }
            }
        })()
    }, [params.id, user])

    return (
        <div className="flex flex-col w-screen h-screen">
            <Header {...{ project, user }} />
            <Content {...{ project, user }} />
        </div>
    );
};