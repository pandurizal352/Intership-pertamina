import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
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
    tanggal_pemeriksaan: '',
    jenis_pemeriksaan: '',
    penjelasan: '',
    keterangan: '',
    status: '',
    foto: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [currentPemeriksaanId, setCurrentPemeriksaanId] = useState(null);
  const [pemeriksaanList, setPemeriksaanList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState(null);

  useEffect(() => {
    const fetchPemeriksaanData = async () => {
      try {
        const response = await fetch('http://localhost:5000/pemeriksaan');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPemeriksaanList(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pemeriksaan data:', error);
        setLoading(false);
      }
    };

    fetchPemeriksaanData();
  }, []);

  const handleSearchChange = async (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    if (newSearchTerm.trim() === '') {
      try {
        const response = await fetch('http://localhost:5000/pemeriksaan');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPemeriksaanList(data);
      } catch (error) {
        console.error('Error fetching pemeriksaan data:', error);
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/pemeriksaan/search?jenis=${encodeURIComponent(newSearchTerm)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPemeriksaanList(data);
        console.log('Search result:', data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pemeriksaan/search?jenis=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPemeriksaanList(data);
      console.log('Search result:', data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handlePdfExport = () => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const columnWidths = [50, 50, 60, 60, 50, 60];
    const totalTableWidth = columnWidths.reduce((acc, width) => acc + width, 0);
    const marginLeft = (pageWidth - totalTableWidth) / 2;
    const marginTop = 20;

    pdf.setFontSize(18);
    pdf.text('DATA PEMERIKSAAN', marginLeft + 60, marginTop + 20);
    pdf.setFontSize(11);

    const tableTop = marginTop + 35;
    const headers = ['Tanggal', 'Jenis', 'Penjelasan', 'Keterangan', 'Status', 'Foto'];
    const rowHeight = 10;

    pdf.setFillColor(220, 220, 220);
    pdf.rect(marginLeft, tableTop, totalTableWidth, rowHeight, 'F');

    headers.forEach((header, i) => {
      const headerX = marginLeft + (i * columnWidths[i]) + (columnWidths[i] / 2);
      pdf.text(header, headerX, tableTop + 7, { align: 'center' });
    });

    pdf.line(marginLeft, tableTop + rowHeight, marginLeft + totalTableWidth, tableTop + rowHeight);

    let startY = tableTop + rowHeight;

    pemeriksaanList.forEach(pemeriksaan => {
      pdf.text(pemeriksaan.tanggal_pemeriksaan, marginLeft + (columnWidths[0] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.jenis_pemeriksaan, marginLeft + columnWidths[0] + (columnWidths[1] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.penjelasan, marginLeft + columnWidths[0] + columnWidths[1] + (columnWidths[2] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.keterangan, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + (columnWidths[3] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.status, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + (columnWidths[4] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.foto, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + (columnWidths[5] / 2), startY + 7, { align: 'center' });

      pdf.line(marginLeft, startY, marginLeft + totalTableWidth, startY);
      pdf.line(marginLeft, startY + rowHeight, marginLeft + totalTableWidth, startY + rowHeight);
      
      startY += rowHeight;
    });

    pdf.rect(marginLeft, tableTop, totalTableWidth, (pemeriksaanList.length + 1) * rowHeight, 'S');

    const verticalLineX = marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4];
    pdf.line(verticalLineX, tableTop, verticalLineX, startY);

    pdf.save('pemeriksaan_data.pdf');
  };

  const handleDetailClick = (pemeriksaan) => {
    setSelectedPemeriksaan(pemeriksaan);
    setDetailModalIsOpen(true);
  };

  const handleEditClick = (pemeriksaan) => {
    setEditMode(true);
    setCurrentPemeriksaanId(pemeriksaan.id_pemeriksaan);
    setFormData({
      tanggal_pemeriksaan: pemeriksaan.tanggal_pemeriksaan,
      jenis_pemeriksaan: pemeriksaan.jenis_pemeriksaan,
      penjelasan: pemeriksaan.penjelasan,
      keterangan: pemeriksaan.keterangan,
      status: pemeriksaan.status,
      foto: pemeriksaan.foto,
    });
    setModalIsOpen(true);
  };

  const handleDeleteClick = (pemeriksaan) => {
    setCurrentPemeriksaanId(pemeriksaan.id_pemeriksaan);
    setConfirmDeleteIsOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/pemeriksaan/${currentPemeriksaanId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting data');
      }

      setPemeriksaanList((prevPemeriksaanList) =>
        prevPemeriksaanList.filter((item) => item.id_pemeriksaan !== currentPemeriksaanId)
      );
      setConfirmDeleteIsOpen(false);
      console.log('Delete successful for:', currentPemeriksaanId);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openModal = () => {
    setEditMode(false);
    setFormData({
      tanggal_pemeriksaan: '',
      jenis_pemeriksaan: '',
      penjelasan: '',
      keterangan: '',
      status: '',
      foto: '',
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
      [name]: value 
    });
  };

  const handleExcelExport = () => {
    const ws = XLSX.utils.json_to_sheet(pemeriksaanList, {
      header: ['tanggal_pemeriksaan', 'jenis_pemeriksaan', 'penjelasan', 'keterangan', 'status', 'foto'],
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pemeriksaan Data');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'pemeriksaan_data.xlsx');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = editMode ? `http://localhost:5000/pemeriksaan/${currentPemeriksaanId}` : 'http://localhost:5000/pemeriksaan';
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

      const updatedPemeriksaan = await response.json();
      if (editMode) {
        setPemeriksaanList((prevPemeriksaanList) =>
          prevPemeriksaanList.map((pemeriksaan) =>
            pemeriksaan.id_pemeriksaan === currentPemeriksaanId ? updatedPemeriksaan : pemeriksaan
          )
        );
      } else {
        setPemeriksaanList((prevPemeriksaanList) => [...prevPemeriksaanList, updatedPemeriksaan]);
      }
      closeModal();
    } catch (error) {
      console.error(editMode ? 'Error updating data:' : 'Error adding data:', error);
    }
  };

  return (
    <div className="pemeriksaan">
      <h2>Manajemen Pemeriksaan</h2>
      <button className="add-data-button" onClick={openModal}>Tambah Pemeriksaan</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari pemeriksaan..." 
          aria-label="Cari pemeriksaan" 
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
                <th>Tanggal</th>
                <th>Jenis</th>
                <th>Penjelasan</th>
                <th>Keterangan</th>
                <th>Status</th>
                <th>Foto</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {pemeriksaanList.map((pemeriksaan) => (
                <tr key={pemeriksaan.id_pemeriksaan}>
                  <td>{pemeriksaan.tanggal_pemeriksaan}</td>
                  <td>{pemeriksaan.jenis_pemeriksaan}</td>
                  <td>{pemeriksaan.penjelasan}</td>
                  <td>{pemeriksaan.keterangan}</td>
                  <td>{pemeriksaan.status}</td>
                  <td>{pemeriksaan.foto}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="action-button-detail " onClick={() => handleDetailClick(pemeriksaan)}><FaInfoCircle /> detail</button>
                      <button className="action-button-edit " onClick={() => handleEditClick(pemeriksaan)}><FaRegEdit /> edit</button>
                      <button className="action-button-hapus " onClick={() => handleDeleteClick(pemeriksaan)}><FaRegTrashAlt /> hapus</button>
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
        pemeriksaanDetail={selectedPemeriksaan}
      />
    </div>
  );
}

export default Crudsopir;
