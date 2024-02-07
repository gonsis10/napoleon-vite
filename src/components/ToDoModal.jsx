import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const { ipcRenderer } = window.require("electron");

function ToDoModal() {
  const [modalVisible, setModal] = useState(false);
  const [list, setList] = useState("");
  const [item, setItem] = useState("");
  const inputElement = useRef(null);

  function handleShowModal(event, data) {
    setList(data.list);
    setModal(true);
    selected();
  }

  useEffect(() => {
    ipcRenderer.on("show-modal", handleShowModal);

    return () => {
      ipcRenderer.removeListener("show-modal", handleShowModal);
    };
  }, []);

  function exit() {
    setModal(false);
  }

  function handleChange(e) {
    setItem(e.target.value);
  }

  function selected() {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && item != "") {
      ipcRenderer.send("add-item", { id: uuidv4(), list: list, title: item, completed: false });
      setItem("");
      e.target.value = "";
      setModal(false);
    }
  }

  return (
    <div className={`fixed ${modalVisible ? "z-20" : "hidden"} h-screen w-screen backdrop-blur-md`}>
      <div className="flex h-full justify-center items-center">
        <div className=" bg-white rounded-lg px-4 py-5">
          <div className="mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Add Item to {list}</h3>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="e.g. Homework"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              ref={inputElement}
              required
            />
          </div>
          <div>
            <button onClick={exit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToDoModal;
