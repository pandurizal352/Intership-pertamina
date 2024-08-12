import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import TopBar from './components/TopBarr';
import Dashboard from './components/Dashboard';

import Crudpemeriksaan from './pemeriksaan/crudpemeriksa';
import CrudPerusahaan from './perusahaan/crudPerusahaan';

import Crudpetugas from './petugas/crudpetugas';
import Crudsopir from './sopir/crudsopir';

import Navbar from './components/landingpage/navbar';
import Hero from './components/landingpage/hero';
import Servis from './components/landingpage/servis';
import Kontak from './components/landingpage/kontak';
import Footer from './components/landingpage/footer';


import Login from './components/landingpage/login';



import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState('dashboard');

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
    <><div>
      <Navbar />
      <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec000e" fill-opacity="1" d="M0,64L40,85.3C80,107,160,149,240,154.7C320,160,400,128,480,128C560,128,640,160,720,186.7C800,213,880,235,960,218.7C1040,203,1120,149,1200,149.3C1280,149,1360,203,1400,229.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
      <Login />
      
      {/* <Hero/>
      <Servis />
      <Kontak /> */}
      <Footer />
      </div>
    {/* <div className="App">
      <TopBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className={`content ${sidebarOpen ? 'shrink' : ''}`}>
          {renderComponent()}
        </div>
      </div>
    </div> */}
    </>
  );
}

export default App;
