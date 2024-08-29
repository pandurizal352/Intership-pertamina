import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPemeriksa from './AddPemeriksa';// Pastikan jalur impor benar
import ConfirmDeleteModal from './ConfirmDelete';
import DetailModal from './Detail'; // Pastikan jalur impor benar


import '../components/CRUD.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Pemeriksaan = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    userId: userId || '',
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
    Verifikasi: '',
  });
  
  const [pemeriksaanData, setPemeriksaanData] = useState([]);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
const [selectedDetail, setSelectedDetail] = useState(null);

  
  
  useEffect(() => {
    // Fetch data from API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/pemeriksaan');
        const data = await response.json();
        setPemeriksaanData(data);
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
    const itemToView = pemeriksaanData.find(item => item.id_pemeriksaan === id);
    if (itemToView) {
      console.log('Item to view:', itemToView);
      setSelectedDetail(itemToView);
      setDetailModalIsOpen(true);
    }
  };
  
  
  const handleEditClick = (id) => {
    const itemToEdit = pemeriksaanData.find(item => item.id_pemeriksaan === id);
    if (itemToEdit) {
      setFormData(itemToEdit);
      setModalIsOpen(true);
    }
  };
  

  const handleDeleteClick = (id) => {
    setIdToDelete(id);
    setDeleteModalIsOpen(true);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      try {
        const response = await fetch(`http://localhost:5000/pemeriksaan/${idToDelete}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setPemeriksaanData(pemeriksaanData.filter(item => item.id_pemeriksaan !== idToDelete));
          setDeleteModalIsOpen(false);
          setIdToDelete(null);
        } else {
          console.error('Failed to delete data');
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };

  const openModal = () => {
    if (!formData.id_pemeriksaan) {
      setFormData({
        userId,
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
        Verifikasi: '',
      });
    }
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    // Reset form data
    setFormData({
      userId,
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
      Verifikasi: '',
    });
  
    // Tutup modal
    setModalIsOpen(false);
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  
    try {
      const method = formData.id_pemeriksaan ? 'PUT' : 'POST';
      const url = formData.id_pemeriksaan ? `http://localhost:5000/pemeriksaan/${formData.id_pemeriksaan}` : 'http://localhost:5000/pemeriksaan';
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
  
        if (method === 'POST') {
          setPemeriksaanData([...pemeriksaanData, updatedData]);
        } else {
          setPemeriksaanData(pemeriksaanData.map(item => item.id_pemeriksaan === updatedData.id_pemeriksaan ? updatedData : item));
        }
  
        // Reset formData after successful submission
        setFormData({
          userId,
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
          Verifikasi: '',
        });
  
        closeModal();
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
            <th>Verifikasi</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pemeriksaanData.map((item) => (
            <tr key={item.id_pemeriksaan}>
              
              <td>{item.tanggal_pemeriksaan}</td>
              <td>{item.jenis_pemeriksaan}</td>
              <td>{item.penjelasan}</td>
              <td>{item.keterangan}</td>
              <td>{item.status}</td>
              <td>{item.foto}</td>
              <td>{item.Verifikasi}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-button-detail" onClick={() => handleDetailClick(item.id_pemeriksaan)}><FaInfoCircle />Detail</button>
                  <button className="action-button-edit" onClick={() => handleEditClick(item.id_pemeriksaan)}><FaRegEdit />Edit</button>
                  <button className="action-button-hapus" onClick={() => handleDeleteClick(item.id_pemeriksaan)}><FaRegTrashAlt />Hapus</button>
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

<ConfirmDeleteModal
  isOpen={deleteModalIsOpen}
  onRequestClose={() => setDeleteModalIsOpen(false)}
  onConfirm={confirmDelete}
/>
<DetailModal
  isOpen={detailModalIsOpen}
  onRequestClose={() => setDetailModalIsOpen(false)}
  data={selectedDetail}
/>

    </div>
  );
};

export default Pemeriksaan;
