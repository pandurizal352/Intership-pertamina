// HalamanPerusahaan.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HalamanPerusahaan({ formData = {}, setFormData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Halaman Perusahaan</h2>
        <input
          type="date"
          name="tanggal_cek_fisik"
          placeholder="Tanggal Cek Fisik"
          value={formData.tanggal_cek_fisik || ''}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        
        <input
          type="text"
          name="nama_perusahaan"
          placeholder="Nama Perusahaan"
          value={formData.nama_perusahaan || ''}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          name="nomor_polisi"
          placeholder="Nomor Polisi"
          value={formData.nomor_polisi || ''}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/halaman1')}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={() => navigate('/halaman3')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default HalamanPerusahaan;
