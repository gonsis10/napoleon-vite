import { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);

  function update() {
    setVisible(localStorage.getItem("user") ? true : false);
  }

  function handleRender(event) {
    update();
  }

  function handleSidebarToggle(event) {
    setOpen((o) => !o);
  }

  useEffect(() => {
    update();

    ipcRenderer.on("render", handleRender);

    return () => {
      ipcRenderer.removeListener("render", handleRender);
      ipcRenderer.removeListener("sidebar-toggle", handleSidebarToggle);
    };
  }, []);

  useEffect(() => {
    ipcRenderer.on("sidebar-toggle", handleSidebarToggle);
    return () => {
      ipcRenderer.removeListener("sidebar-toggle", handleSidebarToggle);
    };
  }, []);

  return (
    <div className={`${visible ? "" : "hidden"}`}>
      <aside className={`fixed top-0 left-0 bg-transparent w-14 h-screen transition-transform -translate-x-full${open ? "" : "translate-x-0"} duration-150 text-gray-100 p-2 z-1`}>
        <div className="flex flex-col h-full justify-center">
          <ul className="space-y-8 font-medium">
            <li>
              <Link to="/" className="flex items-center justify-center rounded-lg bg-black/40 transition-colors hover:bg-gray-700 h-10 w-10 shadow-md">
                {/* <img
                  src={Napoleon}
                  class="w-9 h-9 text-gray-200 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  alt="Napoleon"
                /> */}
                <FaHome size={28} className="fill-gray-200" />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="flex items-center justify-center rounded-lg bg-black/40 transition-colors hover:bg-gray-700 h-10 w-10  shadow-md">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                </svg>
              </Link>
            </li>
            <li>
              <Link to="/stats" href="#" className="flex items-center justify-center rounded-lg bg-black/40 transition-colors hover:bg-gray-700 h-10 w-10 shadow-md">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
              </Link>
            </li>
            <li>
              <a href="#" className="flex items-center justify-center rounded-lg bg-black/40 transition-colors hover:bg-gray-700 h-10 w-10 shadow-md">
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                {/* <span class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span> */}
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div className="fixed bottom-0 left-0 z-2 lg:p-2 md:p-[0.4rem] p-[0.3rem]">
        <button className="flex items-center justify-center rounded-lg bg-black/40 transition-colors hover:bg-gray-700 h-10 w-10 backdrop-blur-sm shadow-md" onClick={() => setOpen(!open)}>
          <IoMdSettings size={28} className="fill-gray-200" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
