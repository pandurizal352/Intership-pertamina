import React from 'react';
import { FaBars } from 'react-icons/fa';
import './TopBar.css';

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`topbar ${isSidebarOpen ? '' : 'shrink'}`}>
      <button className="toggle-sidebar-button" onClick={() => toggleSidebar(!isSidebarOpen)}>
        <FaBars />
      </button>
      <h2 className="topbar-title">Intership Pertamina</h2>
    </div>
  );
};

export default Topbar;
