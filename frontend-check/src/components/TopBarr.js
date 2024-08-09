// components/TopBar.js
import React from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import './TopBar.css';

const TopBar = ({ sidebarOpen, toggleSidebar }) => {
  return (
    <div className="topbar">
      <button
        className={`sidebar-toggle ${!sidebarOpen ? 'closed' : ''}`}
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <SlArrowLeft /> : <SlArrowRight />}
      </button>
    </div>
  );
};

export default TopBar;
