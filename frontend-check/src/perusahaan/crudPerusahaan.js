import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPerusahaan from './AddPerusahaan'; 
import ConfirmDeleteModal from './ConfirmDelete'; 
import DetailPerusahaanModal from './Detail'; 
import '../components/CRUD.css';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Set the application element for accessibility
Modal.setAppElement('#root');

// Base URL for API
const BASE_URL = 'http://localhost:5000/perusahaan';

const Crudperusahaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false); 
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false); 
  const [formData, setFormData] = useState({
    tanggal_cek_fisik: '',
    nomor_polisi: '',
    nama_perusahaan: '',
  });
  const [editMode, setEditMode] = useState(false); 
  const [currentPerusahaanId, setCurrentPerusahaanId] = useState(null); 
  const [perusahaanList, setPerusahaanList] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedPerusahaan, setSelectedPerusahaan] = useState(null); 

  useEffect(() => {
    fetchPerusahaanData();
  }, []); 

  const fetchPerusahaanData = async (query = '') => {
    try {
      const response = await fetch(`${BASE_URL}${query}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setPerusahaanList(data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching perusahaan data:', error);
      setLoading(false); 
    }
  };

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.trim() === '') {
      fetchPerusahaanData();
    } else {
      fetchPerusahaanData(`/search?nama_perusahaan=${encodeURIComponent(newSearchTerm)}`);
    }
  };

  const handleSearchClick = () => {
    fetchPerusahaanData(`/search?nama_perusahaan=${encodeURIComponent(searchTerm)}`);
  };

  const handlePdfExport = () => {
    const logoBase64 = ''; 
  
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const marginTop = 20;
    const columnWidths = [60, 60, 90]; // Adjust column widths
    const totalTableWidth = columnWidths.reduce((acc, width) => acc + width, 0);
    const marginLeft = (pageWidth - totalTableWidth) / 2;
  
    pdf.addImage(logoBase64, 'PNG', marginLeft, marginTop, 50, 20); // Adjust size and position as needed
  
    pdf.setFontSize(18);
    pdf.text('DATA PETUGAS', marginLeft + 60, marginTop + 20);
    pdf.setFontSize(11);
  
    pdf.setFontSize(12);
    const tableTop = marginTop + 35;
  
    const headers = ['Tanggal Cek Fisik', 'Nomor Polisi', 'Nama Perusahaan'];
    const rowHeight = 10;
  
    pdf.setFillColor(220, 220, 220);
    pdf.rect(marginLeft, tableTop, totalTableWidth, rowHeight, 'F');
  
    headers.forEach((header, i) => {
      const headerX = marginLeft + (i * columnWidths[i]) + (columnWidths[i] / 2);
      pdf.text(header, headerX, tableTop + 7, { align: 'center' });
    });
  
    pdf.line(marginLeft, tableTop + rowHeight, marginLeft + totalTableWidth, tableTop + rowHeight);
  
    let startY = tableTop + rowHeight;
  
    perusahaanList.forEach(perusahaan => {
      pdf.text(perusahaan.tanggal_cek_fisik, marginLeft + (columnWidths[0] / 2), startY + 7, { align: 'center' });
      pdf.text(perusahaan.nomor_polisi, marginLeft + columnWidths[0] + (columnWidths[1] / 2), startY + 7, { align: 'center' });
      pdf.text(perusahaan.nama_perusahaan, marginLeft + columnWidths[0] + columnWidths[1] + (columnWidths[2] / 2), startY + 7, { align: 'center' });
  
      pdf.line(marginLeft, startY, marginLeft + totalTableWidth, startY);
      pdf.line(marginLeft, startY + rowHeight, marginLeft + totalTableWidth, startY + rowHeight);
      
      startY += rowHeight; 
    });
  
    pdf.rect(marginLeft, tableTop, totalTableWidth, (perusahaanList.length + 1) * rowHeight, 'S');
    const verticalLineX = marginLeft + columnWidths[0];
    pdf.line(verticalLineX, tableTop, verticalLineX, startY);
    pdf.line(verticalLineX + columnWidths[1], tableTop, verticalLineX + columnWidths[1], startY);
  
    pdf.save('data_perusahaan.pdf');
  };
  
  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(perusahaanList, {
      header: ['tanggal_cek_fisik', 'nomor_polisi', 'nama_perusahaan'],
    });
  
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Perusahaan Data');
  
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'perusahaan_data.xlsx');
  };

  const handleDetailClick = (perusahaan) => {
    setSelectedPerusahaan(perusahaan); 
    setDetailModalIsOpen(true); 
  };

  const handleEditClick = (perusahaan) => {
    setEditMode(true); 
    setCurrentPerusahaanId(perusahaan.id_perusahaan); 
    setFormData({
      tanggal_cek_fisik: perusahaan.tanggal_cek_fisik,
      nomor_polisi: perusahaan.nomor_polisi,
      nama_perusahaan: perusahaan.nama_perusahaan,
    });
    setModalIsOpen(true); 
  };

  const handleDeleteClick = (perusahaan) => {
    setCurrentPerusahaanId(perusahaan.id_perusahaan); 
    setConfirmDeleteIsOpen(true); 
  };
  
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/perusahaan/${currentPerusahaanId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting data');
      }

      setPerusahaanList((prevPerusahaanList) =>
        prevPerusahaanList.filter((item) => item.id_perusahaan !== currentPerusahaanId)
      );
      setConfirmDeleteIsOpen(false); 
      console.log('Delete successful for:', currentPerusahaanId);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openModal = () => {
    setEditMode(false); 
    setFormData({ tanggal_cek_fisik: '', nomor_polisi: '', nama_perusahaan: '' });
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
      const url = editMode ? `http://localhost:5000/perusahaan/${currentPerusahaanId}` : 'http://localhost:5000/perusahaan';
      const method = editMode ? 'PUT' : 'POST';
  
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(editMode ? 'Error updating data' : 'Error adding data');
      }
  
      const updatedPerusahaan = await response.json();
      if (editMode) {
        setPerusahaanList((prevPerusahaanList) =>
          prevPerusahaanList.map((perusahaan) =>
            perusahaan.id_perusahaan === currentPerusahaanId ? updatedPerusahaan : perusahaan
          )
        );
      } else {
        setPerusahaanList((prevPerusahaanList) => [...prevPerusahaanList, updatedPerusahaan]);
      }
      await fetchPerusahaanData();  // Fetch data again after update
      closeModal();
    } catch (error) {
      console.error(editMode ? 'Error updating data:' : 'Error adding data:', error);
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
                <th>Tanggal Cek Fisik</th>
                <th>Nomor Polisi</th>
                <th>Nama Perusahaan</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {perusahaanList.map(perusahaan => (
                <tr key={perusahaan.id_perusahaan}>
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
        </div>
      )}
      <AddPerusahaan
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
        itemName={selectedPerusahaan ? selectedPerusahaan.nama_perusahaan : ''} 
      />
      <DetailPerusahaanModal
        isOpen={detailModalIsOpen}
        onRequestClose={() => setDetailModalIsOpen(false)}
        perusahaanDetail={selectedPerusahaan}
      />
    </div>
  );
};

export default Crudperusahaan;
