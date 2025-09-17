import CreateList from "./components/CreateList";
import { useTodoList } from "./store";
import React, { ChangeEvent, useState } from "react";

export default function App() {
  const globalList = useTodoList((state) => state.globalList); // estado global
  const addList = useTodoList((state) => state.addList); 

  const [titleList, setTitleList] = useState(""); // para coger el valor del input y posteriormente pasarlo a addList

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleList(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (titleList.trim() === "")  // para evitar que se creen listas sin título
      return;  
    addList(titleList);
    setTitleList(""); // para volver a poner el input vacío
  };

  return (
    <>
      <div className="bg-body h-screen">
        <nav className="text-center p-5 text-3xl uppercase font-bold bg-header text-body">
          <h1>Task List</h1>
        </nav>
        <div className="flex space-between gap-10">
          <div className="flex flex-wrap my-10 gap-10 px-5">
            {globalList.map((list) => (
              <CreateList key={list.id} list={list} />
            ))}
          </div>
          <div className="flex mr-5">
            <div className="bg-white rounded-lg p-5 w-96 my-10 h-44">
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <label
                  htmlFor="title"
                  className="uppercase font-bold text-lg text-black"
                >
                  Add a title for a new list
                </label>
                <input
                  className="flex-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter list title..."
                  value={titleList}
                  onChange={handleChange} 
                />
                <button
                  type="submit"
                  className="bg-addbtn text-white px-4 py-2 rounded hover:bg-header transition"
                >
                  Add List
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
