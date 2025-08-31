import React from "react";
import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import SidebarMajor from "./SidebarMajor";
import { Outlet, useLocation } from "react-router-dom";
import RandomJoke from "./RandomJoke";

const Body = () => {
  const location = useLocation();
  const isWatchPage = location.pathname === "/watch";
  const isSidebarOpen = useSelector((store) => store.app.isSidebarOpen);
  return (
    <div className="flex overflow-x-auto">
      <Sidebar />

      <Outlet />
    </div>
  );
};

export default Body;
