import React, { useState } from 'react';
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
import './App.css';
function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                <Servis />
                <Kontak />
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
                    <Sidebar
                      setActiveComponent={setActiveComponent}
                    />
                  </div>
                  <div className="content">
                    {renderComponent()}
                  </div>
                </div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;


// import React, { useState } from 'react';
// import Sidebar from './components/sidebar';
// import TopBar from './components/TopBarr';
// import Dashboard from './components/Dashboard';

// import Crudpemeriksaan from './pemeriksaan/crudpemeriksa';
// import CrudPerusahaan from './perusahaan/crudPerusahaan';

// import Crudpetugas from './petugas/crudpetugas';
// import Crudsopir from './sopir/crudsopir';

// import Navbar from './components/landingpage/navbar';
// import Hero from './components/landingpage/hero';
// import Servis from './components/landingpage/servis';
// import Kontak from './components/landingpage/kontak';
// import Footer from './components/landingpage/footer';


// import Login from './components/landingpage/login';



// import './App.css';

// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('dashboard');

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };


//   const renderComponent = () => {
//     switch(activeComponent) {
//       case 'dashboard':
//         return <Dashboard />;
//       // case 'mtdsardu':
//       //     return <MtdSardu />;
//       case 'pemeriksaan':
//         return <Crudpemeriksaan />;
//       case 'perusahaan':
//         return < CrudPerusahaan/>;
//       case 'petugas':
//         return <Crudpetugas />;
//       case 'sopir':
//         return <Crudsopir />;
    
  
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
    
//     <div>
//       <Navbar />
//       <svg className='' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ec000e" fill-opacity="1" d="M0,64L40,85.3C80,107,160,149,240,154.7C320,160,400,128,480,128C560,128,640,160,720,186.7C800,213,880,235,960,218.7C1040,203,1120,149,1200,149.3C1280,149,1360,203,1400,229.3L1440,256L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path></svg>
      
//       <Hero/>
//       <Servis />
//       <Kontak />
//       <Footer />
//       <Login />
//       </div>
// // {/* <div className="App">
// //       <TopBar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
// //       <div className="main-container">
// //         <div className={`sidebar-container ${sidebarOpen ? 'open' : 'closed'}`}>
// //           <Sidebar
// //             sidebarOpen={sidebarOpen}
// //             toggleSidebar={toggleSidebar}
// //             setActiveComponent={setActiveComponent}
// //           />
// //         </div>
// //         <div className={`content ${sidebarOpen ? 'shrink' : ''}`}>
// //           {renderComponent()}
// //         </div>
// //       </div>
// //     </div> */}
// );
// }

// export default App;
