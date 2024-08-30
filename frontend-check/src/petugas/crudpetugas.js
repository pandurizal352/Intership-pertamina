import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPetugas from './AddPetugas'; 
import ConfirmDeleteModal from './ConfirmDelete'; 
import DetailPetugasModal from './Detail'; 
import '../components/CRUD.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Set the application element for accessibility
Modal.setAppElement('#root');

// Base URL for API
const BASE_URL = 'http://localhost:5000/petugas';

const Crudpetugas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false); 
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false); 
  const [formData, setFormData] = useState({
    nama_petugas: '',
    nomor_petugas: '',
    userId: '',
  });
  const [editMode, setEditMode] = useState(false); 
  const [currentPetugasId, setCurrentPetugasId] = useState(null); 
  const [petugasList, setPetugasList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedPetugas, setSelectedPetugas] = useState(null); 

  useEffect(() => {
    fetchPetugasData();
  }, []); 

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchPetugasData = async (query = '') => {
    try {
      const response = await fetch(`${BASE_URL}${query}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPetugasList(data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching petugas data:', error);
      setLoading(false); 
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() === '') {
      fetchPetugasData();
    } else {
      fetchPetugasData(`/search?nama=${encodeURIComponent(newSearchTerm)}`);
    }
  };

  const handleSearchClick = () => {
    fetchPetugasData(`/search?nama=${encodeURIComponent(searchTerm)}`);
  };

  const handlePdfExport = () => {
    // Base64 string dari gambar logo Pertamina
    const logoBase64 = '';
  
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    // Ukuran halaman A4: 210mm x 297mm
    const pageWidth = pdf.internal.pageSize.getWidth();
  
    // Set margins
    const marginTop = 20;
  
    // Ukuran kolom
    const columnWidths = [80, 80]; // Adjust column widths
    const totalTableWidth = columnWidths.reduce((acc, width) => acc + width, 0);
  
    // Hitung posisi margin kiri agar tabel berada di tengah halaman
    const marginLeft = (pageWidth - totalTableWidth) / 2;
  
    // Add Pertamina logo at the top-left
    pdf.addImage(logoBase64, 'PNG', marginLeft, marginTop, 50, 20); // Adjust size and position as needed
  
    // Add title text next to the logo
    pdf.setFontSize(18);
    pdf.text('DATA PETUGAS', marginLeft + 60, marginTop + 20);
    pdf.setFontSize(11);
  
    // Move down to start the table
    pdf.setFontSize(12);
  
    // Calculate table starting point
    const tableTop = marginTop + 35;
  
    // Add table headers
    const headers = ['Nama Petugas', 'Nomor Petugas'];
    const rowHeight = 10;
  
    // Draw header background and add header text
    pdf.setFillColor(220, 220, 220);
    pdf.rect(marginLeft, tableTop, totalTableWidth, rowHeight, 'F');
  
    headers.forEach((header, i) => {
      const headerX = marginLeft + (i * columnWidths[i]) + (columnWidths[i] / 2);
      pdf.text(header, headerX, tableTop + 7, { align: 'center' });
    });
  
    // Draw header bottom line
    pdf.line(marginLeft, tableTop + rowHeight, marginLeft + totalTableWidth, tableTop + rowHeight);
  
    // Add table rows with centered text and border
    let startY = tableTop + rowHeight;
  
    petugasList.forEach(petugas => {
      pdf.text(petugas.nama_petugas, marginLeft + (columnWidths[0] / 2), startY + 7, { align: 'center' });
      pdf.text(petugas.nomor_petugas.toString(), marginLeft + columnWidths[0] + (columnWidths[1] / 2), startY + 7, { align: 'center' });
  
      // Draw row borders
      pdf.line(marginLeft, startY, marginLeft + totalTableWidth, startY);
      pdf.line(marginLeft, startY + rowHeight, marginLeft + totalTableWidth, startY + rowHeight);
      
      startY += rowHeight; // Move to the next row
    });
  
    // Draw table outer border
    pdf.rect(marginLeft, tableTop, totalTableWidth, (petugasList.length + 1) * rowHeight, 'S');
  
    // Draw vertical line to separate the two columns
    const verticalLineX = marginLeft + columnWidths[0];
    pdf.line(verticalLineX, tableTop, verticalLineX, startY);
  
    // Finalize and save the PDF
    pdf.save('checklist.pdf');
  };
  
  const handleExcelExport = () => {
    // Buat worksheet dari data petugas
    const ws = XLSX.utils.json_to_sheet(petugasList, {
      header: ['nama_petugas', 'nomor_petugas'],
    });
  
    // Buat workbook dan tambahkan worksheet ke dalamnya
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'petugas Data');
  
    // Buat buffer dan simpan file Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'petugas_data.xlsx');
  };

  const handleDetailClick = (petugas) => {
    setSelectedPetugas(petugas); 
    setDetailModalIsOpen(true); 
  };

  const handleEditClick = (petugas) => {
    setEditMode(true); 
    setCurrentPetugasId(petugas.id_petugas); 
    setFormData({
      nama_petugas: petugas.nama_petugas,
      nomor_petugas: petugas.nomor_petugas,
    });
    setModalIsOpen(true); 
  };

  const handleDeleteClick = (petugas) => {
    setCurrentPetugasId(petugas.id_petugas); 
    setConfirmDeleteIsOpen(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/petugas/${currentPetugasId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error deleting data');
      }

      setPetugasList((prevPetugasList) =>
        prevPetugasList.filter((item) => item.id_petugas !== currentPetugasId)
      );
      setConfirmDeleteIsOpen(false); 
      console.log('Delete successful for:', currentPetugasId);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openModal = () => {
    setEditMode(false); 
    setFormData({ nama_petugas: '', nomor_petugas: '' });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = editMode ? `http://localhost:5000/petugas/${currentPetugasId}` : 'http://localhost:5000/petugas';
      const method = editMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          ...getAuthHeaders(),
        },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) {
        throw new Error(editMode ? 'Error updating data' : 'Error adding data');
      }

      const updatedPetugas = await response.json();
      if (editMode) {
        setPetugasList((prevPetugasList) =>
          prevPetugasList.map((petugas) =>
            petugas.id_petugas === currentPetugasId ? updatedPetugas : petugas
          )
        );
      } else {
        setPetugasList((prevPetugasList) => [...prevPetugasList, updatedPetugas]);
      }
      await fetchPetugasData();  // Fetch data again after update
      closeModal();
    } catch (error) {
      console.error(editMode ? 'Error updating data:' : 'Error adding data:', error);
    }
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
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button 
          className="btn btn-outline-secondary search-button" 
          type="button" 
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
        <div id="pdf-content">
          <table>
            <thead>
              <tr>
                <th>Nama Petugas</th>
                <th>Nomor Petugas</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {petugasList.map(petugas => (
                <tr key={petugas.id_petugas}>
                  <td>{petugas.nama_petugas}</td>
                  <td>{petugas.nomor_petugas}</td>
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
        </div>
      )}
      <AddPetugas
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <ConfirmDeleteModal
        isOpen={confirmDeleteIsOpen}
        onRequestClose={() => setConfirmDeleteIsOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={selectedPetugas ? selectedPetugas.nama_petugas : ''} 
      />
      <DetailPetugasModal
        isOpen={detailModalIsOpen}
        onRequestClose={() => setDetailModalIsOpen(false)}
        petugasDetail={selectedPetugas}
      />
    </div>
  );
};

export default Crudpetugas;
