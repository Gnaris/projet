import { ProjectType } from "@/types/ProjectType";
import { StateOfTask, TaskType, TypeOfTask } from "@/types/TaskType";
import { createContext } from "react";

type projectContextType = {
    projects: ProjectType[],
    setProjects: (projects: ProjectType[]) => void,
    selectedProject: ProjectType | undefined,
    setSelectedProject: (project: ProjectType) => void,
    editProjectHeader: (name: string, description: string) => void
    deleteTask: (id: number) => void
    setTaskFormType: (type: "ADD" | "EDIT") => void,
    taskFormType: "ADD" | "EDIT",
    selectedTask: TaskType | undefined,
    setSelectedTask: (task: TaskType) => void,
    taskTypes: TypeOfTask[],
    taskStates: StateOfTask[],
    editTask: (title: string, description: string, effort: number, type: TypeOfTask, state: StateOfTask) => void
    addTask: (task: TaskType) => void,
}

const projectContext = createContext<projectContextType>({
    projects: [],
    setProjects: (projects: ProjectType[]) => { },
    selectedProject: undefined,
    setSelectedProject: (project: ProjectType) => { },
    editProjectHeader: (name: string, description: string) => { },
    deleteTask: (id: number) => { },
    setTaskFormType: (type: "ADD" | "EDIT") => { },
    taskFormType: "ADD",
    selectedTask: undefined,
    setSelectedTask: (task: TaskType) => { },
    taskTypes: [],
    taskStates: [],
    editTask: (title: string, description: string, effort: number, type: TypeOfTask, state: StateOfTask) => { },
    addTask: (task: TaskType) => { }
})

export default projectContext