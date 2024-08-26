



import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import Addperusahaan from './AddPerusahaan'; // Pastikan path impor benar
import '../components/CRUD.css';

// Setel elemen aplikasi untuk menghindari masalah aksesibilitas
Modal.setAppElement('#root');

const CrudPerusahaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_perusahaan: '',
    tanggal_cek_fisik: '',
    nomor_polisi: '',
    nama_perusahaan: '',
  });

  const [perusahaanList, setPerusahaanList] = useState([]); // State untuk menyimpan data perusahaan
  const [loading, setLoading] = useState(true); // State untuk indikasi loading

  // Menampilkan Data
  useEffect(() => {
    const fetchPerusahaanData = async () => {
      try {
        const response = await fetch('http://localhost:5000/perusahaan');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPerusahaanList(data); // Simpan data perusahaan ke dalam state
        setLoading(false); // Set loading menjadi false setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching perusahaan data:', error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      }
    };

    fetchPerusahaanData();
  }, []); // Kosong [] agar hanya dijalankan sekali saat komponen mount

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
    // Implementasikan logika pencarian di sini
  };

  const handlePdfExport = () => {
    console.log('PDF Export');
    // Implementasikan logika ekspor PDF di sini
  };

  const handleExcelExport = () => {
    console.log('Excel Export');
    // Implementasikan logika ekspor Excel di sini
  };

  const handleDetailClick = (perusahaan) => {
    console.log('Detail clicked for:', perusahaan);
    // Implementasikan logika detail di sini
  };

  const handleEditClick = (perusahaan) => {
    console.log('Edit clicked for:', perusahaan);
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = (perusahaan) => {
    console.log('Delete clicked for:', perusahaan);
    // Implementasikan logika hapus di sini
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ 
      ...formData, 
      [name]: value
    });
  };

  // Mengirim data ke database
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/perusahaan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding data');
      }

      const newPerusahaan = await response.json();
      setPerusahaanList((prevSopirList) => [...prevSopirList, newPerusahaan]);
      closeModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="perusahaan">
      <h2>Manajemen Perusahaan</h2>
      <button className="add-data-button" onClick={openModal}>Tambah Perusahaan</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari perusahaan..." 
          aria-label="Cari perusahaan" 
          aria-describedby="button-addon2" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button 
          className="btn btn-outline-secondary search-button" 
          type="button" 
          id="button-addon2" 
          onClick={handleSearchClick}
        >
          Cari
        </button>
        <button 
          className="export-button pdf-button" 
          type="button" 
          onClick={handlePdfExport}
        >
          Ekstrak PDF
        </button>
        <button 
          className="export-button excel-button" 
          type="button" 
          onClick={handleExcelExport}
        >
          Ekstrak Excel
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID Perusahaan</th>
              <th>Tanggal Cek Fisik</th>
              <th>Nomor Polisi</th>
              <th>Nama Perusahaan</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {perusahaanList.map((perusahaan) => (
              <tr key={perusahaan.id_perusahaan}>
                <td>{perusahaan.id_perusahaan}</td>
                <td>{perusahaan.tanggal_cek_fisik}</td>
                <td>{perusahaan.nomor_polisi}</td>
                <td>{perusahaan.nama_perusahaan}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button-detail" onClick={() => handleDetailClick(perusahaan)}><FaInfoCircle /> detail</button>
                    <button className="action-button-edit" onClick={() => handleEditClick(perusahaan)}><FaRegEdit /> edit</button>
                    <button className="action-button-hapus" onClick={() => handleDeleteClick(perusahaan)}><FaRegTrashAlt /> hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Addperusahaan
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CrudPerusahaan;
