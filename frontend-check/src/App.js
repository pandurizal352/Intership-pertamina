import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
               
                <Hero />
                <div id="servis">
                  <Servis />
                </div>
                <div id="kontak">
                  <Kontak />
                </div>
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
          {isLoggedIn && (
            <Route path="/halaman1" element={<Inputdatasupir />} />
          )}
          {isLoggedIn && (
            <Route path="/halaman2" element={<Inputdataperusahaan />} />
          )}
          {isLoggedIn && (
            <Route path="/halaman3" element={<Inputdatapemeriksaan />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
