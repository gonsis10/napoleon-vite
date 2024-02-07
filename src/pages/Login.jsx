import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ToDoList from "../components/ToDoList";
import TitleBar from "../components/TitleBar";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Clock from "../components/Clock";
import Timer from "../components/Timer";
const { ipcRenderer } = window.require("electron");

function Login() {
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [mode, setMode] = useState("default");

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  function update() {
    setLoggedIn(localStorage.getItem("user") ? true : false);
  }

  function handleRender(event) {
    update();
  }

  function handleDoubleClick(event) {
    if (mode === "default") {
      setMode("focus");
    } else {
      setMode("default");
    }
    console.log("hehe");
  }

  useEffect(() => {
    update();

    ipcRenderer.on("render", handleRender);

    return () => {
      ipcRenderer.removeListener("render", handleRender);
    };
  }, []);

  useEffect(() => {
    if (user.length !== 0) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          ipcRenderer.send("render");
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null

  return (
    <div className="absolute font-spacegrotesk bg-gray-200 h-full w-full overflow-hidden">
      <div id="content" className="flex h-full justify-center items-center">
        {loggedIn ? (
          <>
            {/* <button
              className="p-2 bg-slate-500"
              onClick={() => {
                ipcRenderer.send("clear");
                console.log("cleared");
              }}
            >
              RESET
            </button> */}
            <div className="bg-gray-100 shadow-lg rounded-lg select-none transition-all fade">
              {mode === "default" ? <Clock onDoubleClick={handleDoubleClick} /> : <Timer onDoubleClick={handleDoubleClick} />}
            </div>
          </>
        ) : (
          <button onClick={() => login()} className="py-1 px-2 rounded-md bg-emerald-200 m-0 border-2 border-emerald-300">
            Login
          </button>
        )}
      </div>
    </div>
  );
}
export default Login;
