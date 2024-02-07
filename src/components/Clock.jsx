import { useState, useEffect } from "react";

const Clock = ({ onDoubleClick }) => {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  function formatTime(d) {
    let regHrs = d.getHours();
    let regMins = d.getMinutes();
    let hours;
    if (regHrs === 12) {
      hours = regHrs;
    } else if (regHrs !== 0) {
      hours = regHrs % 12;
    } else {
      hours = 1;
    }
    return `${hours}:${regMins < 10 ? "0" + regMins : regMins}`;
  }

  function formatDate(d) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    return `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}`;
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex flex-col p-4 items-center justify-center">
      <h1 className="text-6xl font-bold cursor-pointer" onDoubleClick={onDoubleClick}>
        {formatTime(date)}
      </h1>
      <hr className="flex border-none lg:h-[0.10rem] h-[0.05rem] bg-gray-700 rounded-full mt-1 mb-2" />
      <h3>{formatDate(date)}</h3>
    </div>
    // <div className="flex-auto flex-col p-4 text-center justify-center">
    //   <h1 className="text-[4rem] font-bold">{formatTime(date)}</h1>
    //   {/* <hr className="flex border-none lg:h-[0.10rem] h-[0.05rem] bg-gray-700 rounded-full my-2" /> */}
    //   <h3>{formatDate(date)}</h3>
    // </div>
  );
};

export default Clock;
