
export interface ProjectType {
    id: number;
    nom: string;
    description: string;
    managerId: number;
    manager: {
        id: number;
        name: string;
    };
    tasks: {
        id: number;
        projectId: number;
        titre: string;
        description: string;
        effort: number;
        stateId: number;
        typeId: number;
    }[];
}

export interface ProjectTaskType {
    id: number,
    nom: string,
    description: string,
    managerId: number,
    tasks: {
        id: number,
        titre: string,
        description: string,
        effort: number,
        state: { id: number, state: string },
        type: { id: number, type: string },
        projectId: number,
        stateId: number,
        typeId: number
    }[]
    users: {
        id: number,
        projectId: number,
        status: { id: number, status: string }
        user: { id: number, name: string }
        userId: number
    }[]
}