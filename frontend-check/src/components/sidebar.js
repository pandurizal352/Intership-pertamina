import React, { useState } from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaBuilding } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import { BsPersonBadgeFill } from "react-icons/bs";
import { FcInspection } from "react-icons/fc";

const Sidebar = ({ setActiveComponent }) => {
  const [active, setActive] = useState('dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, key: 'dashboard' },
    { name: 'Pemeriksaan', icon: < FcInspection />, key: 'pemeriksaan' },
    { name: 'Perusahaan', icon: <FaBuilding />, key: 'perusahaan' },
    { name: 'Petugas', icon: <BsPersonBadgeFill />, key: 'petugas' },
    { name: 'Sopir', icon: < GiSteeringWheel />, key: 'sopir' },
  ];

  const handleMenuClick = (key) => {
    setActive(key);
    setActiveComponent(key);
  };

  return (
    <div className="sidebar open">
      <div className="sidebar-header">
        <h2>Intership Pertamina</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li
            key={item.key}
            className={active === item.key ? 'active' : ''}
            onClick={() => handleMenuClick(item.key)}
          >
            <div className="menu-item-content">
              <div className="menu-item-icon">
                {item.icon}
              </div>
              <div className="menu-item-text">
                <span>{item.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <span>© 2024 Intership Pertamina</span>
      </div>
    </div>
  );
};

export default Sidebar;