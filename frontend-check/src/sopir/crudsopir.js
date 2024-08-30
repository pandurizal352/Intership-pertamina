import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
// import html2canvas from 'html2canvas';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import Addsopir from './Addsopir'; // Pastikan path impor benar
import ConfirmDeleteModal from './Confirmdelete'; // Import modal konfirmasi hapus
import DetailSopirModal from './Detail'; // Import modal detail
import '../components/CRUD.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';



// Setel elemen aplikasi untuk menghindari masalah aksesibilitas
Modal.setAppElement('#root');

const Crudsopir = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false); 
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false); 
  const [formData, setFormData] = useState({
    nama_sopir: '',
    nomer_LO: '',
  });
  const [editMode, setEditMode] = useState(false); 
  const [currentSopirId, setCurrentSopirId] = useState(null); 
  const [sopirList, setSopirList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedSopir, setSelectedSopir] = useState(null); 

  useEffect(() => {
    const fetchSopirData = async () => {
      try {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');
  
        // Lakukan permintaan API dengan menyertakan header Authorization
        const response = await fetch('http://localhost:5000/sopir', {
          headers: {
            'Authorization': `Bearer ${token}` // Sertakan token di header
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setSopirList(data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching sopir data:', error);
        setLoading(false); 
      }
    };
  
    fetchSopirData();
  }, []);
  

  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() === '') {
      try {
        const response = await fetch('http://localhost:5000/sopir');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSopirList(data); 
      } catch (error) {
        console.error('Error fetching sopir data:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/sopir/search?nama=${encodeURIComponent(newSearchTerm)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSopirList(data); 
        console.log('Search result:', data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sopir/search?nama=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSopirList(data); 
      console.log('Search result:', data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handlePdfExport = () => {
    // Base64 string dari gambar logo Pertamina
    const logoBase64 = 'data:image/png;base64,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'; // Ganti dengan Base64 string gambar Pertamina yang telah didapatkan
  
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    // Ukuran halaman A4: 210mm x 297mm
    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();
  
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
    pdf.text('DATA SOPIR', marginLeft + 60, marginTop + 20);
    pdf.setFontSize(11);
  
    // Move down to start the table
    pdf.setFontSize(12);
  
    // Calculate table starting point
    const tableTop = marginTop + 35;
  
    // Add table headers
    const headers = ['Nama Sopir', 'Nomer LO'];
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
  
    sopirList.forEach(sopir => {
      pdf.text(sopir.nama_sopir, marginLeft + (columnWidths[0] / 2), startY + 7, { align: 'center' });
      pdf.text(sopir.nomer_LO.toString(), marginLeft + columnWidths[0] + (columnWidths[1] / 2), startY + 7, { align: 'center' });
  
      // Draw row borders
      pdf.line(marginLeft, startY, marginLeft + totalTableWidth, startY);
      pdf.line(marginLeft, startY + rowHeight, marginLeft + totalTableWidth, startY + rowHeight);
      
      startY += rowHeight; // Move to the next row
    });
  
    // Draw table outer border
    pdf.rect(marginLeft, tableTop, totalTableWidth, (sopirList.length + 1) * rowHeight, 'S');
  
    // Draw vertical line to separate the two columns
    const verticalLineX = marginLeft + columnWidths[0];
    pdf.line(verticalLineX, tableTop, verticalLineX, startY);
  
    // Finalize and save the PDF
    pdf.save('checklist.pdf');
  };
  
  
  

  

  const handleDetailClick = (sopir) => {
    setSelectedSopir(sopir); 
    setDetailModalIsOpen(true); 
  };

  const handleEditClick = (sopir) => {
    
    setEditMode(true); 
    setCurrentSopirId(sopir.id_sopir); 
    setFormData({
      nama_sopir: sopir.nama_sopir,
      nomer_LO: sopir.nomer_LO,
    });
    setModalIsOpen(true); 
  };

  const handleDeleteClick = (sopir) => {
    setCurrentSopirId(sopir.id_sopir); 
    setConfirmDeleteIsOpen(true); 
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token'); // Ambil token dari localStorage
  
      const response = await fetch(`http://localhost:5000/sopir/${currentSopirId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, // Sertakan token di header
        },
      });
  
      if (!response.ok) {
        throw new Error('Error deleting data');
      }
  
      setSopirList((prevSopirList) =>
        prevSopirList.filter((item) => item.id_sopir !== currentSopirId)
      );
      setConfirmDeleteIsOpen(false); 
      console.log('Delete successful for:', currentSopirId);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  

  const openModal = () => {
    setEditMode(false); 
    setFormData({
      nama_sopir: '',
      nomer_LO: '',
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'nomer_LO' ? parseInt(value, 10) : value 
    });
  };

  const handleExcelExport = () => {
    // Buat worksheet dari data sopir
    const ws = XLSX.utils.json_to_sheet(sopirList, {
      header: ['nama_sopir', 'nomer_LO'],
    });

    // Buat workbook dan tambahkan worksheet ke dalamnya
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sopir Data');

    // Buat buffer dan simpan file Excel
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sopir_data.xlsx');
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = editMode ? `http://localhost:5000/sopir/${currentSopirId}` : 'http://localhost:5000/sopir';
      const method = editMode ? 'PUT' : 'POST';
  
      // Konversi userId menjadi integer
      const updatedFormData = {
        ...formData,
        userId: parseInt(formData.userId, 10),
      };
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Ambil token dari localStorage
        },
        body: JSON.stringify(updatedFormData),
      });
  
      if (!response.ok) {
        const errorDetails = await response.text(); // Dapatkan teks respons untuk detail kesalahan
        console.error('Server responded with error:', errorDetails);
        throw new Error(editMode ? 'Error updating data' : 'Error adding data');
      }
  
      const updatedSopir = await response.json();
      if (editMode) {
        setSopirList((prevSopirList) =>
          prevSopirList.map((sopir) =>
            sopir.id_sopir === currentSopirId ? updatedSopir : sopir
          )
        );
      } else {
        setSopirList((prevSopirList) => [...prevSopirList, updatedSopir]);
      }
      closeModal();
    } catch (error) {
      console.error(editMode ? 'Error updating data:' : 'Error adding data:', error);
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
        <p>Loading...</p> 
      ) : (
        <div id="pdf-content">
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
                      <button className="action-button-detail " onClick={() => handleDetailClick(sopir)}><FaInfoCircle /> detail</button>
                      <button className="action-button-edit " onClick={() => handleEditClick(sopir)}><FaRegEdit /> edit</button>
                      <button className="action-button-hapus " onClick={() => handleDeleteClick(sopir)}><FaRegTrashAlt /> hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
  
      <Addsopir
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
      />
  
      <DetailSopirModal
        isOpen={detailModalIsOpen}
        onRequestClose={() => setDetailModalIsOpen(false)}
        sopirDetail={selectedSopir}
      />
    </div>
  );
}  
export default Crudsopir;
 



