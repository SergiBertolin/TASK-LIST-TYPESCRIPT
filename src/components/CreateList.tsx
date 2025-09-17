import React, { ChangeEvent, useState } from "react";
import { useTodoList } from "../store";
import { NewList } from "../types";

type newListProps = {
  list: NewList;
};

export default function CreateList({ list }: newListProps) {
  const [task, setTask] = useState(""); // para coger el valor de la tarea y pasarla al addTask
  const [editingTask, setEditingTask] = useState(""); // Para controlar la edición
  const [editedTask, setEditedTask] = useState(""); // Para guardar el texto editado y después pasarlo al editTask

  const addTask = useTodoList((state) => state.addTask);
  const toggleTask = useTodoList((state) => state.toggleTaskCompletion); // Cambia el  boolean del completed y así poder modificar el estilo cuando se activa el checkbox
  const deleteTask = useTodoList((state) => state.deleteTask);
  const editTask = useTodoList((state) => state.editTask);
  const deleteList = useTodoList((state) => state.deleteList); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() === "") // para evitar que se creen tareas sin texto
      return;
    addTask(list.id, task);
    setTask("");
  };

  const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTask(e.target.value);
  };

  const handleEditSubmit = (taskId: string) => {
    if (editedTask.trim() === "") // para evitar que se guarden tareas modificadas sin texto
      return;
    editTask(list.id, taskId, editedTask);
    setEditingTask("");
  };

  const handleDeleteList = () => {
    deleteList(list.id);
  };

  return (
    <div className="bg-white rounded-lg p-5 ml-5 w-96 max-h-min">
      <h1 className="text-center uppercase font-bold text-xl mb-4">{list.title}</h1>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter new task..."
          value={task}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-addbtn text-white px-4 py-2 rounded hover:bg-header transition"
        >
          Add Task
        </button>
      </form>
      <div className="mb-4">
        {list.tasks.map((t) => (
          <div
            key={t.id}
            className="flex justify-start items-center bg-gray-100 p-2 rounded my-1"
          >
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleTask(list.id, t.id)} // Toggle task completion
              className="mr-2"
            />
            {editingTask === t.id ? ( // cuando se activa el modo edición con el boton de editar que se encuentra más a bajo de este código. Se cambia por un input para poder modificar el texto,
              <input
                className="flex-1 p-2 border rounded"
                type="text"
                value={editedTask}
                onChange={handleEditChange}
              />
            ) : (
              <span
                onClick={() => toggleTask(list.id, t.id)} // Toggle cuando se hace click
                className={`${t.completed ? "line-through text-gray-500" : ""}`}
              >
                {t.task}
              </span>
            )}

            <div className="ml-auto flex gap-2">
              {editingTask === t.id ? ( // cuando se activa el modo edición con el boton editar que se encuentra a bajo de este código. Se cambia el boton de edit por el de save. 
                <button
                  onClick={() => handleEditSubmit(t.id)}
                  className="bg-save text-white px-2 py-1 rounded hover:bg-header w-16"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditingTask(t.id);
                    setEditedTask(t.task);
                  }}
                  className="bg-edit text-white px-2 py-1 rounded hover:bg-yellow-600 w-16"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteTask(list.id, t.id)}
                className="bg-delete text-white px-2 py-1 rounded hover:bg-red-600 w-16"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleDeleteList}
        className="bg-delete text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Delete List
      </button>
    </div>
  );
}
