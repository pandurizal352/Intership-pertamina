import React, { useState, useEffect } from 'react'; // Tambahkan useEffect di sini
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

  const [sopirList, setSopirList] = useState([]); // State untuk menyimpan data sopir
  const [loading, setLoading] = useState(true); // State untuk indikasi loading

  // Menampilkan Data
  // Fetch data sopir dari API saat komponen pertama kali di-render
  useEffect(() => {
    const fetchSopirData = async () => {
      try {
        const response = await fetch('http://localhost:5000/sopir');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSopirList(data); // Simpan data sopir ke dalam state
        setLoading(false); // Set loading menjadi false setelah data berhasil diambil
      } catch (error) {
        console.error('Error fetching sopir data:', error);
        setLoading(false); // Set loading menjadi false jika terjadi error
      }
    };

    fetchSopirData();
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

  const handleDetailClick = (sopir) => {
    console.log('Detail clicked for:', sopir);
    // Implementasikan logika detail di sini
  };

  const handleEditClick = (sopir) => {
    console.log('Edit clicked for:', sopir);
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = (sopir) => {
    console.log('Delete clicked for:', sopir);
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
      [name]: name === 'nomer_LO' ? parseInt(value, 10) : value // Konversi ke integer untuk nomer_LO
    });
  };

  // Mengirim data ke database
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/sopir', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Mengirim data form sebagai JSON
      });

      if (!response.ok) {
        throw new Error('Error adding data');
      }

      const newSopir = await response.json();
      setSopirList((prevSopirList) => [...prevSopirList, newSopir]); // Tambahkan data sopir baru ke state
      closeModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
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

      {loading ? (
        <p>Loading...</p> // Menampilkan loading jika data sedang diambil
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nama Sopir</th>
              <th>Nomer LO</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {sopirList.map((sopir) => (
              <tr key={sopir.id_sopir}>
                <td>{sopir.nama_sopir}</td>
                <td>{sopir.nomer_LO}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button-detail" onClick={() => handleDetailClick(sopir)}><FaInfoCircle />detail</button>
                    <button className="action-button-edit" onClick={() => handleEditClick(sopir)}><FaRegEdit />edit</button>
                    <button className="action-button-hapus" onClick={() => handleDeleteClick(sopir)}><FaRegTrashAlt />hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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
