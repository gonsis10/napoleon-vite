import { useEffect, useState, useRef } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import ToDoItem from "./ToDoItem";

const { ipcRenderer } = window.require("electron");

function ToDoList({ emoji, name }) {
  const [todos, setTodos] = useState([]);
  const refTodos = useRef(null);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let _todos = [...todos];
    //REMOVE AND SAVE
    const draggedItemContent = _todos.splice(dragItem.current, 1)[0];
    //switch positions
    _todos.splice(dragOverItem.current, 0, draggedItemContent);

    //reset pos of ref
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(_todos);
  };

  function toggleModal() {
    ipcRenderer.send("show-modal", { list: name });
  }

  function handleList(event, data) {
    if (data[0] === name) {
      setTodos(data[1]);
    }
  }

  function handleAdd(event, data) {
    console.log("recieved");
    if (data.list === name) {
      console.log("verified");
      setTodos((old) => [{ id: data.id, title: data.title, completed: data.completed }, ...old]);
    }
  }

  function updateItem(id, title, checked) {
    let _todos = [...todos];
    _todos.find((o, i) => {
      if (o.id === id) {
        let _todo = _todos.splice(i, 1)[0][0];
        console.log(_todo);
        _todos.splice(checked ? _todos.length : 0, 0, _todo);
        setTodos(_todos);
        // console.log("true");
        return true; // stop searching
      }

      ("FIX THiS");
    });
  }

  useEffect(() => {
    refTodos.current = todos;
  }, [todos]);

  useEffect(() => {
    return () => {
      ipcRenderer.send("update-list", { list: name, arr: refTodos.current });
      console.log("sent");
    };
  }, []);

  useEffect(() => {
    ipcRenderer.on("get-todo-list", handleList);
    ipcRenderer.on("add-item", handleAdd);

    ipcRenderer.send("get-todo-list", name);
    return () => {
      ipcRenderer.removeListener("get-todo-list", handleList);
      ipcRenderer.removeListener("add-item", handleAdd);
    };
  }, []);

  return (
    <div className="flex flex-col py-4 min-h-full min-w-full ">
      <div className="flex px-4 bg-gray-100 justify-between items-center">
        <h3 className="lg:text-lg text-base">
          {emoji} <span>{name}</span>
        </h3>

        <RiAddBoxLine
          // size={28}
          className="lg:text-2xl text-xl m-0 p-0 cursor-pointer hover:text-gray-400"
          onClick={toggleModal}
        />
      </div>
      <hr className="flex mx-4 border-none lg:h-[0.10rem] h-[0.05rem] bg-gray-700 rounded-full mt-1 mb-2" />
      <div className="relative scrollbar pr-2 mx-4 flex-1 overflow-x-hidden">
        {todos.length === 0 ? (
          "No Items"
        ) : (
          <ul className="absolute flex-1 columns-2 gap-1 w-full transition-all ">
            {todos.map(({ id, title, completed }, index) => (
              <ToDoItem
                index={index}
                id={id}
                key={id}
                title={title}
                completed={completed}
                onClick={updateItem}
                onDragStart={() => (dragItem.current = index)}
                onDragEnter={() => (dragOverItem.current = index)}
                onDragEnd={handleSort}
                className="inline"
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ToDoList;
