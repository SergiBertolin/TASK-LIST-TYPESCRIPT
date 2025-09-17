// store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware"; // permite que el estado del store se guarde de manera persistente
import { NewList } from "./types";

type ListState = {
  globalList: NewList[]; // Lista global de tareas
  addList: (title: string) => void; 
  addTask: (listId: string, task: string) => void; 
  toggleTaskCompletion: (listId: string, taskId: string) => void; // Hace que cuando marquemos el checkbox se subraye el texto y se ponga de color gris
  deleteTask: (listId: string, taskId: string) => void; 
  editTask: (listId: string, taskId: string, newTask: string) => void; 
  deleteList: (id: string) => void; 
};

export const useTodoList = create(
  persist<ListState>(
    (set) => ({
      globalList: [], 
      addList: (title) =>
        set((state) => {
          const newList: NewList = {
            id: String(Date.now()), 
            title,
            tasks: [], 
          };
          return {
            globalList: [...state.globalList, newList], 
          };
        }),

      addTask: (listId, task) =>
        set((state) => ({
          globalList: state.globalList.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: [
                    ...list.tasks,
                    { id: String(Date.now()), task, completed: false },
                  ],
                }
              : list
          ),
        })),
        
      toggleTaskCompletion: (listId, taskId) => // cambia el boolean de completed
        set((state) => ({
          globalList: state.globalList.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, completed: !task.completed }
                      : task
                  ),
                }
              : list
          ),
        })),

      deleteTask: (listId, taskId) =>
        set((state) => ({
          globalList: state.globalList.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.filter((task) => task.id !== taskId),
                }
              : list
          ),
        })),

      editTask: (listId, taskId, newTask) =>
        set((state) => ({
          globalList: state.globalList.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId 
                    ? { ...task, task: newTask } 
                    : task
                  ),
                }
              : list
          ),
        })),

      deleteList: (id) =>
        set((state) => ({
          globalList: state.globalList.filter((list) => list.id !== id),
        })),
    }),
    {
      name: "todo-list-storage", // Nombre del almacenamiento en LocalStorage
    }
  )
);
