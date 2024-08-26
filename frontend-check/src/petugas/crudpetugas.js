import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import Addpetugas from './AddPetugas'; // Pastikan path impor benar
import '../components/CRUD.css';

// Setel elemen aplikasi untuk menghindari masalah aksesibilitas
Modal.setAppElement('#root');

const Crudpetugas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomor_petugas: '',
    nama_petugas: '',
  });

  const [petugasList, setSopirList] = useState([]); // State untuk menyimpan data petugas
  const [loading, setLoading] = useState(true); // State untuk indikasi loading

  // Menampilkan Data
  useEffect(() => {
    const fetchPetugasData = async () => {
      try {
        const response = await fetch('http://localhost:5000/petugas');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSopirList(data); // Simpan data petugas ke dalam state
        setLoading(false); // Set loading menjadi false setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching petugas data:', error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      }
    };

    fetchPetugasData();
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

  const handleDetailClick = (petugas) => {
    console.log('Detail clicked for:', petugas);
    // Implementasikan logika detail di sini
  };

  const handleEditClick = (petugas) => {
    console.log('Edit clicked for:', petugas);
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = (petugas) => {
    console.log('Delete clicked for:', petugas);
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
      const response = await fetch('http://localhost:5000/petugas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding data');
      }

      const newPetugas = await response.json();
      setSopirList((prevSopirList) => [...prevSopirList, newPetugas]);
      closeModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  return (
    <div className="petugas">
      <h2>Manajemen Perusahaan</h2>
      <button className="add-data-button" onClick={openModal}>Tambah Perusahaan</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari petugas..." 
          aria-label="Cari petugas" 
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
              <th>Nomor Petugas</th>
              <th>Nama Petugas</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {petugasList.map((petugas) => (
              <tr key={petugas.nomor_petugas}>
                <td>{petugas.nomor_petugas}</td>
                <td>{petugas.nama_petugas}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button-detail" onClick={() => handleDetailClick(petugas)}><FaInfoCircle /> detail</button>
                    <button className="action-button-edit" onClick={() => handleEditClick(petugas)}><FaRegEdit /> edit</button>
                    <button className="action-button-hapus" onClick={() => handleDeleteClick(petugas)}><FaRegTrashAlt /> hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Addpetugas
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Crudpetugas;
