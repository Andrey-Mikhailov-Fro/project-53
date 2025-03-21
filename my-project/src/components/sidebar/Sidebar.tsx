import "./Sidebar.scss";
import Navbar from "./Navbar";

export default function Sidebar() {
  return (
    <div className="sidebar">
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
      <button className="sidebar-dropdown">
        <img src="/sidebarDropdown.svg" alt="" />
      </button>
    </div>
  );
}
