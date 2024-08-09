import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import Addsopir from './Addsopir'; // Pastikan path impor benar
import '../components/CRUD.css';

// Setel elemen aplikasi untuk menghindari masalah aksesibilitas
Modal.setAppElement('#root');

const Crudsopir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama_sopir: '',
    nomer_LO: '',
  });

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

  const handleDetailClick = () => {
    console.log('Detail clicked');
    // Implementasikan logika detail di sini
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Implementasikan logika pengiriman form di sini
    closeModal();
  };

  return (
    <div className="sopir">
      <h2>Manajemen Sopir</h2>
      <button className="add-data-button" onClick={openModal}>Tambah Sopir</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari sopir..." 
          aria-label="Cari sopir" 
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

      <table>
        <thead>
          <tr>
            <th>Nama Sopir</th>
            <th>Nomer LO</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contoh Nama</td>
            <td>Contoh Nomer LO</td>
            <td>
              <div className="action-buttons">
                <button className="action-button-detail" onClick={handleDetailClick}><FaInfoCircle />detail</button>
                <button className="action-button-edit" onClick={handleEditClick}><FaRegEdit />edit</button>
                <button className="action-button-hapus" onClick={handleDeleteClick}><FaRegTrashAlt />hapus</button>
              </div>
            </td>
          </tr>
          {/* Tambahkan baris data sesuai kebutuhan */}
        </tbody>
      </table>

      <Addsopir
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Crudsopir;
