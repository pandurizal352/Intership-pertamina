import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [perusahaanCount, setPerusahaanCount] = useState(0);
  const [petugasCount, setPetugasCount] = useState(0);
  const [sopirCount, setSopirCount] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');

        // Opsi untuk fetch termasuk header Authorization
        const requestOptions = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };

        const perusahaanResponse = await fetch('http://localhost:5000/perusahaan', requestOptions);
        const petugasResponse = await fetch('http://localhost:5000/petugas', requestOptions);
        const sopirResponse = await fetch('http://localhost:5000/sopir', requestOptions);

        if (!perusahaanResponse.ok || !petugasResponse.ok || !sopirResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const perusahaanData = await perusahaanResponse.json();
        const petugasData = await petugasResponse.json();
        const sopirData = await sopirResponse.json();

        setPerusahaanCount(perusahaanData.length);
        setPetugasCount(petugasData.length);
        setSopirCount(sopirData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataCounts();

    // Ambil data user dari localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUsername(user.username); // Sesuaikan dengan properti yang ada di data user
    }
  }, []);

  const data = [
    { id: 2, title: 'Perusahaan', value: perusahaanCount, color: '#2196f3', chart: 'chart.png' },
    { id: 3, title: 'Petugas', value: petugasCount, color: '#ffc107', chart: 'chart.png' },
    { id: 4, title: 'Sopir', value: sopirCount, color: '#f44336', chart: 'chart.png' },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard admin selamat datang</h1>
      <h2>{username ? `Selamat datang, ${username}` : 'Selamat datang'}</h2>
      <br/>
      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card" style={{ backgroundColor: item.color }}>
            <div className="card-content">
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
