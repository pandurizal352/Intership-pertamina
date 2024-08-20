import React, { useState } from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaBuilding } from 'react-icons/fa';
import { GiSteeringWheel } from "react-icons/gi";
import { BsPersonBadgeFill } from "react-icons/bs";
import { FcInspection } from "react-icons/fc";
import { FaBars } from 'react-icons/fa';  // Icon untuk toggle

const Sidebar = ({ setActiveComponent, toggleSidebar, isSidebarOpen }) => {
  const [active, setActive] = useState('dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, key: 'dashboard' },
    { name: 'Pemeriksaan', icon: <FcInspection />, key: 'pemeriksaan' },
    { name: 'Perusahaan', icon: <FaBuilding />, key: 'perusahaan' },
    { name: 'Petugas', icon: <BsPersonBadgeFill />, key: 'petugas' },
    { name: 'Sopir', icon: <GiSteeringWheel />, key: 'sopir' },
  ];

  const handleMenuClick = (key) => {
    setActive(key);
    setActiveComponent(key);
    toggleSidebar(false);  // Tutup sidebar setelah klik pada layar kecil
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={() => toggleSidebar(!isSidebarOpen)}>
        <FaBars />
      </button>
    </div>
  );
};

export default Sidebar;



// import React, { useState } from 'react';
// import './Sidebar.css';
// import { FaTachometerAlt, FaShoppingCart, FaChartBar, FaBoxOpen, FaTags, FaFacebook, FaTwitter, FaGoogle } from 'react-icons/fa';

// const Sidebar = ({ setActiveComponent }) => { // Terima fungsi dari App.js
//   const [active, setActive] = useState('dashboard');  // state ini menentukan tab yang aktif, default 'dashboard'

//   const menuItems = [
//     { name: 'Dashboard', icon: <FaTachometerAlt />, key: 'dashboard' },
//     { name: 'Pemeriksaan', icon: <FaShoppingCart />, key: 'mtdsardu' },
//     { name: 'Perusahaan', icon: <FaChartBar />, key: 'statistics' }, // Ubah key menjadi 'statistics'
//     { name: 'Petugas', icon: <FaBoxOpen />, key: 'product' },
//     { name: 'Sopir', icon: <FaTags />, key: 'stock' },
//     { name: 'Offer', icon: <FaTags />, key: 'offer' }
//   ];

//   const handleMenuClick = (key) => {
//     setActive(key);
//     setActiveComponent(key); // Ubah state di App.js
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <h2>MTD Perfomer</h2>
//       </div>
//       <ul className="sidebar-menu">
//         {menuItems.map(item => (
//           <li key={item.key} className={active === item.key ? 'active' : ''} onClick={() => handleMenuClick(item.key)}>
//             {item.icon}
//             <span>{item.name}</span>
//           </li>
//         ))}
//       </ul>
//       <div className="sidebar-footer">
//         <FaFacebook />
//         <FaTwitter />
//         <FaGoogle />
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
