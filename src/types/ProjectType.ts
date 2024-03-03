export interface ProjectType {
    id: number,
    nom: string,
    description: string,
    managerId: number,
    manager: { id: number, name: string },
    tasks: {
        id: number,
        titre: string,
        description: string,
        effort: number,
        projectId: number,
        stateId: number,
        typeId: number,
    }[]
}