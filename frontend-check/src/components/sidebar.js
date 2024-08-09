import React, { useState } from 'react';
import './Sidebar.css';
import { FaTachometerAlt, FaShoppingCart, FaChartBar, FaBoxOpen, FaTags, FaFacebook, FaTwitter, FaGoogle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sidebar = ({ setActiveComponent }) => {
  const [active, setActive] = useState('dashboard');
  const [activeSubItem, setActiveSubItem] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

const menuItems = [
  { name: 'Dashboard', icon: <FaTachometerAlt />, key: 'dashboard' },
  { name: 'Pemeriksaan', icon: <FaShoppingCart />, key: 'pemeriksaan' },
  { name: 'Perusahaan', icon: <FaChartBar />, key: 'perusahaan' }, // Ubah key menjadi 'statistics'
  { name: 'Petugas', icon: <FaBoxOpen />, key: 'petugas' },
  { name: 'Sopir', icon: <FaTags />, key: 'sopir' },
  { name: 'Offer', icon: <FaTags />, key: 'offer' }
];

  const handleMenuClick = (key) => {
    setActive(key);
    setActiveComponent(key);
    setActiveSubItem(null);
    if (!menuItems.find(item => item.key === key).dropdown) {
      setOpenDropdown(null);
    }
  };

  const handleSubItemClick = (key) => {
    setActiveSubItem(key);
    setActiveComponent(key);
  };

  const toggleDropdown = (key) => {
    if (openDropdown === key) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(key);
    }
    setActive(key);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Interaship pertamina</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <React.Fragment key={item.key}>
            <li className={active === item.key ? 'active' : ''} onClick={() => item.dropdown ? toggleDropdown(item.key) : handleMenuClick(item.key)}>
              <div className="menu-item-content">
                <div className="menu-item-icon">
                  {item.icon}
                </div>
                <div className="menu-item-text">
                  <span>{item.name}</span>
                </div>
                {item.dropdown && (
                  <div className="menu-item-chevron">
                    {openDropdown === item.key ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                )}
              </div>
            </li>
            {item.dropdown && (
              <ul className={`dropdown-menu ${openDropdown === item.key ? 'open' : ''}`}>
                {item.dropdown.map(subitem => (
                  <li key={subitem.key} className={activeSubItem === subitem.key ? 'active' : ''} onClick={() => handleSubItemClick(subitem.key)}>
                    <span>{subitem.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
      <div className="sidebar-footer">
        <FaFacebook />
        <FaTwitter />
        <FaGoogle />
      </div>
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
