export interface TaskType {
    id: number,
    titre: string,
    description: string,
    projectId: number,
    effort: number,
    stateId: number,
    typeId: number,
    state: StateOfTask,
    type: TypeOfTask
}

export interface TypeOfTask {
    id: number,
    type: string,
}

export interface StateOfTask {
    id: number,
    state: string,
}