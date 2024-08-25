import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ toggleSidebar, isSidebarOpen }) => {
  const [pemeriksaanCount, setPemeriksaanCount] = useState(0);
  const [perusahaanCount, setPerusahaanCount] = useState(0);
  const [petugasCount, setPetugasCount] = useState(0);
  const [sopirCount, setSopirCount] = useState(0);

  useEffect(() => {
    const fetchDataCounts = async () => {
      try {
        const pemeriksaanResponse = await fetch('http://localhost:5000/pemeriksaan');
        const perusahaanResponse = await fetch('http://localhost:5000/perusahaan');
        const petugasResponse = await fetch('http://localhost:5000/petugas');
        const sopirResponse = await fetch('http://localhost:5000/sopir');

        if (!pemeriksaanResponse.ok || !perusahaanResponse.ok || !petugasResponse.ok || !sopirResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const pemeriksaanData = await pemeriksaanResponse.json();
        const perusahaanData = await perusahaanResponse.json();
        const petugasData = await petugasResponse.json();
        const sopirData = await sopirResponse.json();

        setPemeriksaanCount(pemeriksaanData.length);
        setPerusahaanCount(perusahaanData.length);
        setPetugasCount(petugasData.length);
        setSopirCount(sopirData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataCounts();
  }, []);

  const data = [
    { id: 1, title: 'Pemeriksaan', value: pemeriksaanCount, color: '#3f51b5', chart: 'chart.png' },
    { id: 2, title: 'Perusahaan', value: perusahaanCount, color: '#2196f3', chart: 'chart.png' },
    { id: 3, title: 'Petugas', value: petugasCount, color: '#ffc107', chart: 'chart.png' },
    { id: 4, title: 'Sopir', value: sopirCount, color: '#f44336', chart: 'chart.png' },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="card-container">
        {data.map((item) => (
          <div key={item.id} className="card" style={{ backgroundColor: item.color }}>
            <div className="card-content">
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
            <div className="card-chart">
              <img src={item.chart} alt={`${item.title} chart`} />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Dashboard;