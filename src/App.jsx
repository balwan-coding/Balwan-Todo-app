import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const saveToLocalSotrog = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplited: false }]);
    setTodo("");
    saveToLocalSotrog();
  };

  const handleEdit = (event, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
  };

  const handleDelete = (event, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveToLocalSotrog();
  };

  const handleChange = (event) => {
    setTodo(event.target.value);
  };

  const handleCheckbox = (event) => {
    let id = event.target.name;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let newTodos = [...todos];
    newTodos[index].isComplited = !newTodos[index].isComplited;
    setTodos(newTodos);
    saveToLocalSotrog();
  };

  const toggleFinished = (event) => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-violet-200 my-5 min-h-[80vh] md:w-1/2 sm:w-1/2 lg:w-1/2 rounded-xl p-5">
        <h1 className="text-4xl font-bold text-center ">
          BTodo - Manage your Tudos
        </h1>
        <div className="my-5 addtodo">
          <h2 className="text-lg font-bold">Add todo</h2>
          <div className="flex mb-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full px-2 border rounded-md"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="px-2 py-1 mx-5 text-sm font-bold text-white rounded-md disabled:bg-violet-400 disabled:cursor-not-allowed bg-violet-700 hover:bg-violet-950"
            >
              Add
            </button>
          </div>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          id="show"
        />
        <label htmlFor="show" className="ml-2">
          Show Finished
        </label>
        <div className="todos">
          <h2 className="text-lg font-bold">Your todos</h2>
          {todos.length === 0 && (
            <div className="mx-6 text-2xl">No Todo display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isComplited) && (
                <div key={item.id} className="flex justify-between my-3 ">
                  <div className="flex gap-5">
                    <input
                      type="checkbox"
                      onChange={handleCheckbox}
                      checked={item.isComplited}
                      name={item.id}
                    />
                    <div className={item.isComplited ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="flex h-full gap-2 ">
                    <button
                      onClick={(event) => {
                        handleEdit(event, item.id);
                      }}
                      className="px-2 py-1 text-sm font-bold text-white rounded-md bg-violet-700 hover:bg-violet-950"
                    >
                      <MdEditSquare />
                    </button>
                    <button
                      onClick={(event) => {
                        handleDelete(event, item.id);
                      }}
                      className="px-2 py-1 text-sm font-bold text-white rounded-md bg-violet-700 hover:bg-violet-950"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
