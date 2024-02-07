import { useEffect, useState } from "react";

function ToDoItem({ index, id, title, completed, onClick, onDragStart, onDragEnter, onDragEnd }) {
  const [checked, setChecked] = useState(false);

  const handleCheck = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onClick(id, title, isChecked);
  };

  useEffect(() => {
    setChecked(completed);
  }, []);

  return (
    <li
      draggable={checked ? false : true}
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={(e) => onDragEnd(e, index)}
      onDragOver={(e) => e.preventDefault()}
      className={`flex break-inside-avoid-column items-center mb-1 p-1.5 border-2 transition-all duration-150 ${
        checked ? "border-emerald-400 bg-emerald-100 finished" : "border-gray-500 finished cursor-pointer"
      } rounded-lg shadow-md`}
    >
      <input type="checkbox" className="accent-emerald-400 h-4 w-4 lg:h-[1.125rem] lg:w-[1.125rem]" onChange={handleCheck} checked={checked}></input>
      <label className={`flex-1 ml-2 lg:text-sm text-xs font-medium w-5/6 break-words ${checked ? "line-through text-emerald-600" : "text-gray-600 cursor-pointer"}`}>{title}</label>
    </li>
  );
}

export default ToDoItem;
