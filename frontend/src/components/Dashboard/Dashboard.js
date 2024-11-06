import React, { useState } from "react";
import SideNave from "./SideNave";
import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  const togleHandler = () => {
    setHide(!hide);
  };
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-main">
      <div className="top-bar">
        <div className="barsIcon" onClick={togleHandler}>
          <i className="fas fa-bars"></i>
        </div>
        <div className="top-bar-heading">
          <img
            className="top-bar-logo"
            alt="topBarLogo"
            src={localStorage.getItem("imageUrl")}
          />
          <h1>{localStorage.getItem("fullName")}</h1>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
      <div className="dashboard-container">
        <div className={`nav-container ${hide ? "open" : "close"}`}>
          <SideNave />
        </div>
        <div className={`main-container ${hide ? "open" : "close"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
