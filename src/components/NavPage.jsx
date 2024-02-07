import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Stats from "../pages/Stats";
import Login from "../pages/Login";

const NavPage = () => {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </section>
    </React.Fragment>
  );
};

export default NavPage;
