import { useState, useEffect } from "react";
import { IoMdSettings } from "react-icons/io";
import { FaHome } from "react-icons/fa";

import { Link } from "react-router-dom";

const { ipcRenderer } = window.require("electron");

function Plan() {
  const [open, setOpen] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="flex flex-col px-4 pt-4 min-h-full min-w-full ">
      {/* <h3 className="lg:text-lg text-base">🧪 Plan</h3>
      <hr className="flex border-none lg:h-[0.10rem] h-[0.05rem] bg-gray-700 rounded-full mt-1 mb-2" /> */}
      <div className="relative scrollbar flex-1 overflow-x-hidden">
        <ul className="grid grid-cols-2 gap-2 w-full transition-all ">
          <article className="mb-2">
            <div className="p-2 bg-orange-400 text-indigo-50 uppercase grid place-items-center rounded-t-xl">
              <div className="text-sm">Feb 3</div>
            </div>
            <div className="px-4 py-2 grid gap-2 bg-slate-200 rounded-b-xl">
              <div className="grid gap-1">
                <p className="text-slate-400 text-sm">Feb 13-Feb 16</p>
                <h2 className="font-bold text-xl">
                  <a href="#">Soccer Practice</a>
                </h2>
                <div className="grid gap-1">
                  <button className="text-slate-400 flex gap-1 items-center cursor-pointer"></button>
                </div>
              </div>
            </div>
          </article>
          <article className="mb-2">
            <div className="p-2 bg-green-400 text-indigo-50 uppercase grid place-items-center rounded-t-xl">
              <div className="text-sm">Feb 3</div>
            </div>
            <div className="px-4 py-2 grid gap-2 bg-slate-200 rounded-b-xl">
              <div className="grid gap-1">
                <p className="text-slate-400 text-sm">Feb 13-Feb 16</p>
                <h2 className="font-bold text-xl">
                  <a href="#">Soccer Practice</a>
                </h2>
                <div className="grid gap-1">
                  <button className="text-slate-400 flex gap-1 items-center cursor-pointer"></button>
                </div>
              </div>
            </div>
          </article>
          <article className="mb-2">
            <div className="p-2 bg-indigo-300 text-indigo-50 uppercase grid place-items-center rounded-t-xl">
              <div className="text-sm">Feb 3</div>
            </div>
            <div className="px-4 py-2 grid gap-2 bg-slate-200 rounded-b-xl">
              <div className="grid gap-1">
                <p className="text-slate-400 text-sm">Feb 13-Feb 16</p>
                <h2 className="font-bold text-xl">
                  <a href="#">Soccer Practice</a>
                </h2>
                <div className="grid gap-1">
                  <button className="text-slate-400 flex gap-1 items-center cursor-pointer"></button>
                </div>
              </div>
            </div>
          </article>
        </ul>
      </div>
    </div>
  );
}

export default Plan;
