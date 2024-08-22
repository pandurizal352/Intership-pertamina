import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import TopBar from './components/TopBarr';
import Dashboard from './components/Dashboard';

import Crudpemeriksaan from './pemeriksaan/crudpemeriksa';
import CrudPerusahaan from './perusahaan/crudPerusahaan';

import Crudpetugas from './petugas/crudpetugas';
import Crudsopir from './sopir/crudsopir';
import Modal from 'react-modal';



import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('dashboard');
  Modal.setAppElement('#root');
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);

    
  };

  const renderComponent = () => {
    switch(activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      // case 'mtdsardu':
      //     return <MtdSardu />;
      case 'pemeriksaan':
        return <Crudpemeriksaan />;
      case 'perusahaan':
        return < CrudPerusahaan/>;
      case 'petugas':
        return <Crudpetugas />;
      case 'sopir':
        return <Crudsopir />;
    
  
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <TopBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className={`content ${sidebarOpen ? 'shrink' : ''}`}>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;
