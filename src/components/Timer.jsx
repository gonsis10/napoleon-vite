import { useContext, useEffect, useRef, useState } from "react";
import { VscDebugRestart } from "react-icons/vsc";
// import { TimerContext } from './TimerContext'

function Timer({ onDoubleClick }) {
  const [mode, setMode] = useState("pomodoro");
  const [on, setOn] = useState(false);
  const [running, setRunning] = useState(false);
  const Paused = useRef(false);
  const [timer, setTimer] = useState("25:00");
  const Ref = useRef(null);
  const Cycle = useRef(1);
  const modes = ["pomodoro", "five", "ten"];

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
      total,
      minutes,
      seconds,
    };
  }

  function startTimer(e) {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
      return false;
    }

    return true;
  }

  function clearTimer(e) {
    // Adjsut different times from this function
    setOn(true);
    startTimer(e);

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      if (!Paused.current) {
        if (startTimer(e)) {
          if (mode === "pomodoro") {
            Cycle.current += 1;
            if (Cycle.current % 8 === 0) {
              clearTimer(getDeadTime("long"));
            } else if (Cycle.current % 2 === 0) {
              clearTimer(getDeadTime("short"));
            } else {
              clearTimer(getDeadTime("work"));
            }
          }
          console.log("finished");
        }
        console.log("done");
      } else {
        e.setSeconds(e.getSeconds() + 1);
      }
    }, 1000);
    Ref.current = id;
  }

  function getDeadTime(e) {
    let deadline = new Date();

    if (e === "short") {
      deadline.setMinutes(deadline.getMinutes() + 5);
    } else if (e === "long") {
      deadline.setMinutes(deadline.getMinutes() + 10);
    } else {
      deadline.setMinutes(deadline.getMinutes() + 25);
    }

    return deadline;
  }

  function toggleOn() {
    if (!on) {
      setRunning(true);
      if (mode === "pomodoro") {
        clearTimer(getDeadTime("work"));
      } else if (mode === "five") {
        clearTimer(getDeadTime("short"));
      } else {
        clearTimer(getDeadTime("long"));
      }
    } else if (!Paused.current) {
      Paused.current = true;
      setRunning(false);
    } else {
      Paused.current = false;
      setRunning(true);
    }
  }

  return (
    <div className="flex-auto flex-col p-4 text-center justify-center">
      <div className="flex flex-row justify-center items-center gap-2">
        <button
          className={`border-2 ${
            mode === modes[0] ? "border-fuchsia-400 text-fuchsia-400 cursor-default " : "border-slate-300 text-slate-500 hover:border-slate-800 hover:text-slate-800"
          } transition-all rounded-full px-[.75rem] py-[.20rem]`}
          onClick={() => {
            if (mode !== modes[0]) {
              setMode(modes[0]);
              setTimer("25:00");
              clearInterval(Ref.current);
              setRunning(false);
              setOn(false);
              Paused.current = false;
            }
          }}
        >
          pomodoro
        </button>
        <button
          className={`border-2 ${
            mode === modes[1] ? "border-fuchsia-400 text-fuchsia-400 cursor-default " : "border-slate-300 text-slate-500 hover:border-slate-800 hover:text-slate-800"
          } transition-all rounded-full px-[.75rem] py-[.20rem]`}
          onClick={() => {
            if (mode !== modes[1]) {
              setMode(modes[1]);
              setTimer("05:00");
              clearInterval(Ref.current);
              setRunning(false);
              setOn(false);
              Paused.current = false;
            }
          }}
        >
          short break
        </button>
        <button
          className={`border-2 ${
            mode === modes[2] ? "border-fuchsia-400 text-fuchsia-400 cursor-default " : "border-slate-300 text-slate-500 hover:border-slate-800 hover:text-slate-800"
          } transition-all rounded-full px-[.75rem] py-[.20rem]`}
          onClick={() => {
            if (mode !== modes[2]) {
              setMode(modes[2]);
              setTimer("10:00");
              clearInterval(Ref.current);
              setRunning(false);
              setOn(false);
              Paused.current = false;
            }
          }}
        >
          long break
        </button>
      </div>
      <h1 className="text-[5rem] font-bold my-10 cursor-pointer" onDoubleClick={onDoubleClick}>
        {timer}
      </h1>

      <div className="flex flex-row justify-center items-center gap-2">
        <button
          onClick={toggleOn}
          className={`border-2 ${
            running ? "border-fuchsia-400 text-fuchsia-400" : "border-slate-300 text-slate-500 hover:border-slate-800 hover:text-slate-800"
          } transition-all rounded-full px-4 py-[.25rem]`}
        >
          {running ? "pause" : "start"}
        </button>
        <button>
          <VscDebugRestart size={28} className="spin" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
