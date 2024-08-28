import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar';
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
import Register from './components/landingpage/register';
import Ubahpassword from './components/landingpage/ubahpassword';
import Inputdatasupir from './inputdata/inputdatasupir';
import Inputdataperusahaan from './inputdata/input-dataperusahaan';
import Inputdatapemeriksaan from './inputdata/input-datapemeriksaan';

import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'pemeriksaan':
        return <Crudpemeriksaan />;
      case 'perusahaan':
        return <CrudPerusahaan />;
      case 'petugas':
        return <Crudpetugas />;
      case 'sopir':
        return <Crudsopir />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <div style={{ position: 'relative', zIndex: -1, marginTop: '-1rem' }}>
                  <svg
                    style={{ width: '100%', height: 'auto' }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                  >
                    <path
                      fill="#ec000e"
                      fillOpacity="1"
                      d="M0,32L40,64C80,96,160,160,240,202.7C320,245,400,267,480,234.7C560,203,640,117,720,106.7C800,96,880,160,960,154.7C1040,149,1120,75,1200,69.3C1280,64,1360,128,1400,160L1440,192L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
                    ></path>
                  </svg>
                </div>
                <Hero />
                <div id="servis">
                  <Servis />
                </div>
                <div id="kontak">
                  <Kontak />
                </div>
                {isLoggedIn && (
                   <>
                 </>
                )}
                <Route path="/halaman1" element={<Inputdatasupir />} />
                <Route path="/halaman2" element={<Inputdataperusahaan />} />
                <Route path="/halaman3" element={<Inputdatapemeriksaan />} />
                <Footer />
              </>
            }
          />
           
          
          <Route
            path="/login"
            element={
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            }
          />
          <Route
            path="/ubah-password"
            element={
              <>
                <Navbar />
                <Ubahpassword />
                <Footer />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute
                component={() => (
                  <>
                    <button
                      className="toggle-sidebar-button"
                      onClick={toggleSidebar}
                      style={{
                        left: isSidebarOpen ? '250px' : '15px',
                      }}
                    >
                      ☰
                    </button>
                    <div className="main-container">
                      <div className={`sidebar-container ${isSidebarOpen ? 'open' : ''}`}>
                        <Sidebar setActiveComponent={setActiveComponent} />
                      </div>
                      <div className="content">
                        {renderComponent()}
                      </div>
                    </div>
                  </>
                )}
                allowedRoles={['admin']}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
