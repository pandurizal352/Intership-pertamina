import React from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const dataPie = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const dataLine = [
  { name: 'Jan', Passengers: 2400 },
  { name: 'Feb', Passengers: 1398 },
  { name: 'Mar', Passengers: 9800 },
  { name: 'Apr', Passengers: 3908 },
  { name: 'May', Passengers: 4800 },
  { name: 'Jun', Passengers: 3800 },
];

const dataBar = [
  { name: 'Jan', Boeing: 4000, Airbus: 2400 },
  { name: 'Feb', Boeing: 3000, Airbus: 1398 },
  { name: 'Mar', Boeing: 2000, Airbus: 9800 },
  { name: 'Apr', Boeing: 2780, Airbus: 3908 },
  { name: 'May', Boeing: 1890, Airbus: 4800 },
  { name: 'Jun', Boeing: 2390, Airbus: 3800 },
];

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Ini adalah konten Dashboard</p>
            <div className="main-content">
        {/* <div className="flights-info">
        <div className="flight">
          <h3>Boeing 787</h3>
          <p>$548</p>
        </div>
        <div className="flight">
          <h3>Airbus 811</h3>
          <p>$620</p>
        </div>
        <div className="total-flights">
          <h3>Total Flights</h3>
          <p>850</p>
        </div>
      </div>
      <div className="last-trips">
        <h3>Last Trips</h3>
        <table>
          <thead>
            <tr>
              <th>Members</th>
              <th>Flight</th>
              <th>Total Members</th>
              <th>Ticket Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>Qatar</td>
              <td>5</td>
              <td>$56k</td>
            </tr>
            <tr>
              <td>Martin Loisnes</td>
              <td>Emirates</td>
              <td>3</td>
              <td>$56k</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div className="statistics">
        <h3>Statistics</h3>
        <BarChart width={600} height={300} data={dataBar}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Boeing" fill="#8884d8" />
          <Bar dataKey="Airbus" fill="#82ca9d" />
        </BarChart>
      </div>
      <div className="flights-share">
        <h3>Flights Share</h3>
        <PieChart width={400} height={400}>
          <Pie
            data={dataPie}
            cx={200}
            cy={200}
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dataPie.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flights-schedule">
        <h3>Flights Schedule</h3>
        <LineChart width={600} height={300} data={dataLine}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Passengers" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;


// import React, { useState } from 'react';
// import './Dashboard.css';
// import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

// const dataPie = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const dataLine = [
//   { name: 'Jan', Passengers: 2400 },
//   { name: 'Feb', Passengers: 1398 },
//   { name: 'Mar', Passengers: 9800 },
//   { name: 'Apr', Passengers: 3908 },
//   { name: 'May', Passengers: 4800 },
//   { name: 'Jun', Passengers: 3800 },
// ];

// const dataBar = [
//   { name: 'Jan', Boeing: 4000, Airbus: 2400 },
//   { name: 'Feb', Boeing: 3000, Airbus: 1398 },
//   { name: 'Mar', Boeing: 2000, Airbus: 9800 },
//   { name: 'Apr', Boeing: 2780, Airbus: 3908 },
//   { name: 'May', Boeing: 1890, Airbus: 4800 },
//   { name: 'Jun', Boeing: 2390, Airbus: 3800 },
// ];

// const Dashboard = () => {
//   const [activeMenu, setActiveMenu] = useState('Dashboard');

//   return (
//     <div className="dashboard">
//       <div className="sidebar">
//         <div className="profile">
//           <img src="profile-pic.jpg" alt="Alex Johnson" />
//           <h2>Alex Johnson</h2>
//           <p>alex.johnson@gmail.com</p>
//         </div>
//         <nav>
//           <ul>
//             <li className={activeMenu === 'Dashboard' ? 'active' : ''} onClick={() => setActiveMenu('Dashboard')}>Dashboard</li>
//             <li className={activeMenu === 'Flights' ? 'active' : ''} onClick={() => setActiveMenu('Flights')}>Flights</li>
//             <li className={activeMenu === 'Wallet' ? 'active' : ''} onClick={() => setActiveMenu('Wallet')}>Wallet</li>
//             <li className={activeMenu === 'Reports' ? 'active' : ''} onClick={() => setActiveMenu('Reports')}>Reports</li>
//             <li className={activeMenu === 'Statistics' ? 'active' : ''} onClick={() => setActiveMenu('Statistics')}>Statistics</li>
//             <li className={activeMenu === 'Settings' ? 'active' : ''} onClick={() => setActiveMenu('Settings')}>Settings</li>
//           </ul>
//         </nav>
//         <div className="active-users">
//           <h3>Active Users</h3>
//           <div className="users">
//             <img src="user1.jpg" alt="User 1" />
//             <img src="user2.jpg" alt="User 2" />
//             <img src="user3.jpg" alt="User 3" />
//             <span>+70</span>
//           </div>
//         </div>
//       </div>
//       <div className="main-content">
//         <div className="flights-info">
//           <div className="flight">
//             <h3>Boeing 787</h3>
//             <p>$548</p>
//           </div>
//           <div className="flight">
//             <h3>Airbus 811</h3>
//             <p>$620</p>
//           </div>
//           <div className="total-flights">
//             <h3>Total Flights</h3>
//             <p>850</p>
//           </div>
//         </div>
//         <div className="last-trips">
//           <h3>Last Trips</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Members</th>
//                 <th>Flight</th>
//                 <th>Total Members</th>
//                 <th>Ticket Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>John Doe</td>
//                 <td>Qatar</td>
//                 <td>5</td>
//                 <td>$56k</td>
//               </tr>
//               <tr>
//                 <td>Martin Loisnes</td>
//                 <td>Emirates</td>
//                 <td>3</td>
//                 <td>$56k</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className="statistics">
//           <h3>Statistics</h3>
//           <BarChart width={600} height={300} data={dataBar}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="Boeing" fill="#8884d8" />
//             <Bar dataKey="Airbus" fill="#82ca9d" />
//           </BarChart>
//         </div>
//         <div className="flights-share">
//           <h3>Flights Share</h3>
//           <PieChart width={400} height={400}>
//             <Pie
//               data={dataPie}
//               cx={200}
//               cy={200}
//               labelLine={false}
//               label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//             >
//               {dataPie.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"} />
//               ))}
//             </Pie>
//           </PieChart>
//         </div>
//         <div className="flights-schedule">
//           <h3>Flights Schedule</h3>
//           <LineChart width={600} height={300} data={dataLine}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="Passengers" stroke="#8884d8" activeDot={{ r: 8 }} />
//           </LineChart>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
