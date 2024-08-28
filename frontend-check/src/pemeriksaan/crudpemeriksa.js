import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPemeriksa from './AddPemeriksa'; // Pastikan jalur impor benar
import '../components/CRUD.css';


// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Pemeriksaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    tanggal_pemeriksaan: '',
    jenis_pemeriksaan: '',
    penjelasan: '',
    keterangan: '',
    status: '',
    foto: '',
    safety_switch: false,
    kabellistrik1: false,
    kabellistrik2: false,
    kabellistrik3: false,
    kabellistrik4: false,
    kabellistrik5: false,
    Batteraiaccu1: false,
    Batteraiaccu2: false,
    Batteraiaccu3: false,
    Batteraiaccu4: false,
  });
  const [dataPemeriksaan, setDataPemeriksaan] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/'); // Update this URL if necessary
        const result = await response.json();
        setDataPemeriksaan(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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

  const handleDetailClick = (id) => {
    console.log('Detail clicked for ID:', id);
    // Implementasikan logika detail di sini
  };

  const handleEditClick = (id) => {
    console.log('Edit clicked for ID:', id);
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = (id) => {
    console.log('Delete clicked for ID:', id);
    // Implementasikan logika hapus di sini
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Implementasikan logika pengiriman formulir di sini
    closeModal();
  };

  return (
    <div className="pemeriksaan">
      <h2>Manajemen Pemeriksaan</h2>
      <button className="add-data-button" onClick={openModal}>Tambah data</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari data..." 
          aria-label="Cari data" 
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
          Ekspor PDF
        </button>
        <button 
          className="export-button excel-button" 
          type="button" 
          onClick={handleExcelExport}
        >
          Ekspor Excel
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Tanggal Pemeriksaan</th>
            <th>Jenis Pemeriksaan</th>
            <th>Penjelasan</th>
            <th>Keterangan</th>
            <th>Status</th>
            <th>Foto</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dataPemeriksaan.map((pemeriksaan) => (
            <tr key={pemeriksaan.id_pemeriksaan}>
              <td>{pemeriksaan.tanggal_pemeriksaan}</td>
              <td>{pemeriksaan.jenis_pemeriksaan}</td>
              <td>{pemeriksaan.penjelasan}</td>
              <td>{pemeriksaan.keterangan}</td>
              <td>{pemeriksaan.status}</td>
              <td>{pemeriksaan.foto}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-button-detail" onClick={() => handleDetailClick(pemeriksaan.id_pemeriksaan)}><FaInfoCircle /> Detail</button>
                  <button className="action-button-edit" onClick={() => handleEditClick(pemeriksaan.id_pemeriksaan)}><FaRegEdit /> Edit</button>
                  <button className="action-button-hapus" onClick={() => handleDeleteClick(pemeriksaan.id_pemeriksaan)}><FaRegTrashAlt /> Hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddPemeriksa
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Pemeriksaan;
