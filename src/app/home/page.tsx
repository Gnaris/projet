'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserTokenPayload } from '@/types/userTokenType';
import BtnLogout from '@/components/global/BtnLogout';
import ProjectContainer from '@/components/home/ProjectTable/ProjectContainer';
import { ProjectType } from '@/types/ProjectType';
import User from '@/entity/User';
import { getProjectsOfUser } from '@/services/api/projectService';
import TaskContainer from '@/components/home/ProjectTaskTable/TaskContainer';
import projectContext from './../../services/provider/projectContext';
import { getTaskStates, getTaskTypes } from '@/services/api/taskService';
import { StateOfTask, TaskType, TypeOfTask } from '@/types/TaskType';


const Page = () => {

    const router = useRouter()

    const [user, setUser] = useState<UserTokenPayload>();
    const [projects, setProjects] = useState<ProjectType[]>([])
    const [selectedProject, setSelectedProject] = useState<ProjectType>()
    const [selectedTask, setSelectedTask] = useState<TaskType>()
    const [taskFormType, setTaskFormType] = useState<"ADD" | "EDIT">("ADD")
    const [taskTypes, setTaskTypes] = useState<TypeOfTask[]>([])
    const [taskStates, setTaskStates] = useState<StateOfTask[]>([])

    useEffect(() => {

        (async () => {
            const user = new User();
            const userPayload = user.getUserPayload();

            if (!userPayload) {
                router.push("/")
                localStorage.removeItem("token")
            } else {
                setUser(userPayload)
                const userProjects = await getProjectsOfUser();
                setProjects(userProjects)

                const taskData = await Promise.all([getTaskTypes(), getTaskStates()])
                setTaskTypes(taskData[0])
                setTaskStates(taskData[1])
            }
        })()

    }, [router])

    const editProjectHeader = (name: string, description: string) => {
        if (selectedProject != undefined) {
            setProjects(prevProjects =>
                prevProjects.map(project =>
                    project.id === selectedProject.id
                        ? {
                            ...project,
                            project: {
                                ...project.project,
                                nom: name,
                                description: description,
                            },
                        }
                        : project
                )
            );
        }
    };

    const deleteTask = (id: number) => {
        if (selectedProject != undefined) {
            const response = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")
            if (response) {
                selectedProject.project.tasks = selectedProject.project.tasks.filter(t => t.id != id)
                setProjects(prev => prev.map(p => (p.id == selectedProject.id ? selectedProject : p)))
            }
        }
    }

    const editTask = (title: string, description: string, effort: number, type: TypeOfTask, state: StateOfTask) => {
        if (selectedTask != undefined && selectedProject != undefined) {
            const newTask = selectedProject.project.tasks.map(t => t.id === selectedTask.id
                ? { ...t, titre: title, description, effort, typeId: type.id, type, stateId: state.id, state }
                : t
            );

            const updatedProject = { ...selectedProject, project: { ...selectedProject.project, tasks: newTask } };

            const updatedProjects = projects.map(project =>
                project.id === selectedProject.id ? updatedProject : project
            );

            setProjects(updatedProjects)
            setSelectedProject(updatedProject)
            setSelectedTask(undefined)
        }
    }

    const addTask = (task: TaskType) => {
        if (selectedProject) {
            const currentTask = [...selectedProject.project.tasks]
            currentTask.push(task)
            const updatedSelectedProjet = { ...selectedProject, project: { ...selectedProject.project, tasks: currentTask } }

            const updatedProjects = projects.map(project =>
                project.id === selectedProject.id ? updatedSelectedProjet : project
            );

            setProjects(updatedProjects)
            setSelectedProject(updatedSelectedProjet)
        }
    }


    return (
        <>
            <projectContext.Provider value={{
                projects,
                setProjects,
                selectedProject,
                setSelectedProject,
                editProjectHeader,
                deleteTask,
                taskFormType,
                setTaskFormType,
                selectedTask,
                setSelectedTask,
                taskTypes,
                taskStates,
                editTask,
                addTask
            }}>
                <div>
                    <div className='flexCenter column w-100vw'>
                        <p className='fs-32px'>Bonjour {user?.name}</p>
                        <BtnLogout />
                    </div>
                    <ProjectContainer userId={user?.id} />
                    {selectedProject && <TaskContainer />}
                </div>
            </projectContext.Provider>
        </>
    );
};

export default Page;