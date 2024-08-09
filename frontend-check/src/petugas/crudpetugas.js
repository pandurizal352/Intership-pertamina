import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPetugas from './AddPetugas';
import '../components/CRUD.css';

Modal.setAppElement('#root');

const CrudPetugas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomor_petugas: '',
    nama_petugas: '',
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
  };

  const handlePdfExport = () => {
    console.log('PDF Export');
  };

  const handleExcelExport = () => {
    console.log('Excel Export');
  };

  const handleDetailClick = () => {
    console.log('Detail clicked');
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
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
    closeModal();
  };

  return (
    <div className="petugas">
      <h2>Manajemen Petugas</h2>
      <button className="add-data-button" onClick={openModal}>Tambah Petugas</button>

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

      <table>
        <thead>
          <tr>
            <th>Nomor Petugas</th>
            <th>Nama Petugas</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contoh Nomor</td>
            <td>Contoh Nama</td>
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

      <AddPetugas
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CrudPetugas;
