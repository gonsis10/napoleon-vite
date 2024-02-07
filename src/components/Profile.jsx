import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

const { ipcRenderer } = window.require("electron");

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [toggled, setToggle] = useState(false);
  const navigate = useNavigate();

  function handleToggle() {
    if (profile.length !== 0) {
      setToggle(!toggled);
    }
  }

  function handleLogout() {
    googleLogout();
    localStorage.setItem("user", "");
    navigate("/");
    ipcRenderer.send("render");
  }

  function update() {
    try {
      setProfile(JSON.parse(localStorage.getItem("user")));
    } catch {
      setProfile("");
    }
  }

  function handleRender(event) {
    update();
  }

  useEffect(() => {
    update();

    ipcRenderer.on("render", handleRender);

    return () => {
      ipcRenderer.removeListener("render", handleRender);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="relative w-8 h-8 overflow-hidden rounded-full cursor-pointer bg-gray-600 no-drag" type="button" onClick={handleToggle}>
        {profile ? (
          <img className="absolute w-10 h-10 object-cover justify-center items-center" src={profile.picture} alt="Rounded avatar"></img>
        ) : (
          <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        )}
      </div>
      <div id="userDropdown" className={`fixed z-10 ${toggled ? "" : "hidden"} font-spacegrotesk bg-white divide-y divide-gray-200 rounded-lg my-2 mr-1 shadow w-44 top-10`}>
        <div className="px-4 py-3 text-sm text-gray-600">
          <div>{profile.name}</div>
          <div className="font-medium truncate">{profile.email}</div>
        </div>

        {/* <div className="py-2 text-sm text-gray-600">
          <a href="#" onClick={handleToggle} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Settings
          </a>
        </div> */}

        <div className="py-1">
          <button
            href="#"
            onClick={() => {
              handleToggle();
              handleLogout();
            }}
            className="block px-4 py-2 text-sm text-gray-400 w-full text-left hover:bg-gray-100 hover:bg-gray-600 hover:text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Profile;
