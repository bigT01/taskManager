import {create} from "zustand";
import {devtools, persist} from "zustand/middleware";

export interface ITask {
    id: string
    title: string,
    description: string,
    status: string,
    deadline: number,
    priority: number
}

interface IState {
    tasks: ITask[]
    user: { name: string, password: string }
    addUser: (name: string, password: string) => void,
    isLogin: boolean,
    setIsLogin: (login: boolean) => void,
    setDraggedTask: (id: string) => void,
    draggedTask: string,
    moveTask: (id: string, status: string) => void,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    addTask: (ITask) => void,
    editTask: (ITask) => void,
    editingId: string,
    setEditingId: (id: string) => void,
    deleteTask: (id: string) => void,
    updateTask: (dataTasks: ITask[]) => void,
    setLogout: () => void
}

export const useStore = create<IState>()(
    devtools(
        persist(
            (set) => ({
                user: {},
                addUser: (name, password) => set(() => ({user: {name, password}})),
                isLogin: false,
                setIsLogin: (isLogin: boolean) => set(() => ({isLogin: isLogin})),
                tasks: [],
                setDraggedTask: (id: string) => set({draggedTask: id}, false, "setDraggedTask"),
                moveTask: (id:string, status:string) => set(state => ({
                    tasks: state.tasks.map((task : ITask) => task.id === id ? Object.assign(task, {status : status})  : task)
                })),
                setIsOpen: (isOpen: boolean) => set({isOpen: isOpen}),
                addTask: ({title, deadline, status, id, priority, description}:ITask) => set(state => ({tasks: [...state.tasks, {id, title, deadline, status, priority, description}]})),
                editTask: ({id, title, deadline, status, priority, description}: ITask) => set(state => ({tasks: state.tasks.map(task => task.id === id ? {id, title, deadline, status, priority, description} : task)})),
                setEditingId: (id: string) => set(() => ({editingId: id})),
                deleteTask: (id: string) => set((state) => ({tasks: state.tasks.filter(task => task.id !== id)})),
                updateTask: (dataTasks: ITask[]) => set(() => ({tasks: dataTasks})),
                setLogout: () => set(() => ({user: {}, isLogin: false}))
            }),
            { name: 'store' },
        ),
    ),
)

