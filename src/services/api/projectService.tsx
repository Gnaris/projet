import { ProjectType } from "@/types/ProjectType"

export const getProjectsOfUser = async () => {
    const projects: ProjectType[] = await fetch("/api/project",
        {
            method: "POST",
            headers: {
                'Authorization': localStorage.getItem("token") as string,
            }
        })
        .then(res => res.json())

    return projects;
}

export const updateProjectHeader = async (id: number, name: string, description: string) => {
    const response: { id: number, name: string, description: string } = await fetch("/api/project",
        {
            method: "PUT",
            headers: {
                'Authorization': localStorage.getItem("token") as string
            },
            body: JSON.stringify({ id, name, description })
        }).then(res => res.json());
    return response
}