export type NewList = {
    id: string
    title: string
    tasks: Task[]
}

export type Task = {
    id: string
    task: string
    completed: boolean
} 

export type GlobalList = {
    lists: NewList[]
}