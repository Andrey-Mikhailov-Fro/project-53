import "./Sidebar.scss";
import Navbar from "./Navbar";
import { useState } from "react";

export default function Sidebar() {
  const [show, setShow] = useState(false);

  return (
    <div className={show ? "sidebar" : "sidebar sidebar-closed"}>
      <div
        className={
          show
            ? "sidebar-container"
            : "sidebar-container sidebar-container-closed"
        }
      >
        <div className="header">
          <div className="header-logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div>
            <h2 className="header-name">СБ21</h2>
            <p className="header-add">Секретарь ВКК</p>
          </div>
        </div>
        <Navbar variant="profile" />
        <Navbar variant="workspace" />
        <div className="navigation-node about">
          <img src="/about.svg" />
          <a href="" className="navigation-node-text">
            О сервисе
          </a>
        </div>
      </div>
      <button
        className={
          show ? "sidebar-dropdown" : "sidebar-dropdown sidebar-dropdown-closed"
        }
        onClick={() => setShow(!show)}
      >
        <img src="/sidebarDropdown.svg" alt="" />
      </button>
    </div>
  );
}
