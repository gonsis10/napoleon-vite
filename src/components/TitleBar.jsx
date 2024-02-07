import { useEffect } from "react";
import Profile from "./Profile";

const { ipcRenderer } = window.require("electron");

function TitleBar() {
  return (
    <div className="titlebar flex h-10 bg-gray-100 shadow-lg border-b border-gray-300 p-1 items-center justify-end">
      <Profile />
    </div>
  );
}

export default TitleBar;
