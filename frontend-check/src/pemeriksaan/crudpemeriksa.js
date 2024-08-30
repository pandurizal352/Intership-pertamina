import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPemeriksa from './AddPemeriksa';// Pastikan jalur impor benar
import ConfirmDeleteModal from './ConfirmDelete';
import DetailModal from './Detail'; // Pastikan jalur impor benar
import jsPDF from 'jspdf';
import sampleImage from '../assets/pertamina-hitam-putih.png'

import '../components/CRUD.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Pemeriksaan = ({ userId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    Batteraiaccu1: false,
    Batteraiaccu2: false,
    Batteraiaccu3: false,
    Batteraiaccu4: false,
    Nama_perusahaan: '',
    verifikasi: '',
    foto: '',
   
    kabellistrik1: false,
    kabellistrik2: false,
    kabellistrik3: false,
    kabellistrik4: false,
    kabellistrik5: false,
    kapasitas_tangki: '',
    masa_berlakukeur: '',
    masa_berlakupajak: '',
    masa_berlakustnk: '',
    masa_berlakutera: '',
    nomor_polisi: '',
   
    safety_switch: false,
    sim_Amt1: '',
    sim_Amt2: '',
    t2_belakang: '',
    t2_depan: '',
    t2_tengah1: '',
    t2_tengah2: '',
    tanggal_pemeriksaan: '',
    temuan: '',
    umur_tangki: '',
    userId: userId || '',
    
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
    // Base64 string dari gambar logo Pertamina
    const logoBase64 = ''; 
  
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    // Ukuran halaman A4: 210mm x 297mm
    const pageWidth = pdf.internal.pageSize.getWidth();
    // const pageHeight = pdf.internal.pageSize.getHeight();
  
    // Set margins
    const marginTop = 20;
  
    // Ukuran kolom
    const columnWidths = [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]; // Adjust column widths
    const totalTableWidth = columnWidths.reduce((acc, width) => acc + width, 0);
  
    // Hitung posisi margin kiri agar tabel berada di tengah halaman
    const marginLeft = (pageWidth - totalTableWidth) / 2;
  
    // Add Pertamina logo at the top-left
    pdf.addImage(sampleImage, 'PNG', marginLeft, marginTop, 50, 20); // Adjust size and position as needed
  
    // Add title text next to the logo
    pdf.setFontSize(18);
    pdf.text('DATA PEMERIKSAAN', marginLeft + 60, marginTop + 20);
    pdf.setFontSize(11);
  
    // Move down to start the table
    pdf.setFontSize(12);
  
    // Calculate table starting point
    const tableTop = marginTop + 35;
  
    // Add table headers
    const headers = ['Tanggal Pemeriksaan', 'Nama Perusahaan', 'Kapasitas Tangki', 'Nomor Polisi', 'Masa Berlaku STNK', 'Masa Berlaku Pajak', 'SIM AMT 1', 'SIM AMT 2', 'Masa Berlaku Tera', 'T2 Depan', 'T2 Tengah 1', 'T2 Tengah 2', 'T2 Belakang', 'Masa Berlaku KEUR', 'Umur Tangki', 'Safety Switch', 'Kabel Listrik 1', 'Kabel Listrik 2', 'Kabel Listrik 3', 'Kabel Listrik 4', 'Kabel Listrik 5', 'Baterai Accu 1', 'Baterai Accu 2', 'Baterai Accu 3', 'Baterai Accu 4', 'Temuan', 'Foto', 'Verifikasi'];
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
  
    pemeriksaanData.forEach(pemeriksaan => {
      pdf.text(pemeriksaan.tanggal_pemeriksaan, marginLeft + (columnWidths[0] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Nama_perusahaan, marginLeft + columnWidths[0] + (columnWidths[1] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kapasitas_tangki, marginLeft + columnWidths[0] + columnWidths[1] + (columnWidths[2] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.nomor_polisi, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + (columnWidths[3] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.masa_berlakustnk, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + (columnWidths[4] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.masa_berlakupajak, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + (columnWidths[5] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.sim_Amt1, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + (columnWidths[6] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.sim_Amt2, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + (columnWidths[7] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.masa_berlakutera, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + (columnWidths[8] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.t2_depan, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + (columnWidths[9] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.t2_tengah1, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + (columnWidths[10] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.t2_tengah2, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + (columnWidths[11] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.t2_belakang, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + (columnWidths[12] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.masa_berlakukeur, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + (columnWidths[13] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.umur_tangki, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + (columnWidths[14] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.safety_switch ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + (columnWidths[15] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kabellistrik1 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + (columnWidths[16] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kabellistrik2 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kabellistrik3 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kabellistrik4 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.kabellistrik5 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Batteraiaccu1 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Batteraiaccu2 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Batteraiaccu3 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] + columnWidths[23] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Batteraiaccu4 ? 'Yes' : 'No', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] + columnWidths[23] + columnWidths[24] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.temuan, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] + columnWidths[23] + columnWidths[24] + columnWidths[25] / 2, startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.foto, marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] + columnWidths[23] + columnWidths[24] + columnWidths[25] + (columnWidths[26] / 2), startY + 7, { align: 'center' });
      pdf.text(pemeriksaan.Verifikasi ? pemeriksaan.Verifikasi : '', marginLeft + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7] + columnWidths[8] + columnWidths[9] + columnWidths[10] + columnWidths[11] + columnWidths[12] + columnWidths[13] + columnWidths[14] + columnWidths[15] + columnWidths[16] + columnWidths[17] + columnWidths[18] + columnWidths[19] + columnWidths[20] + columnWidths[21] + columnWidths[22] + columnWidths[23] + columnWidths[24] + columnWidths[25] + columnWidths[26] / 2, startY + 7, { align: 'center' });
  
      startY += rowHeight;
    });
  
    // Finalize and save the PDF
    pdf.save('pemeriksaan.pdf');
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
        Batteraiaccu1: false,
Batteraiaccu2: false,
Batteraiaccu3: false,
Batteraiaccu4: false,
Nama_perusahaan: '',
verifikasi: '',
foto: '',

kabellistrik1: false,
kabellistrik2: false,
kabellistrik3: false,
kabellistrik4: false,
kabellistrik5: false,
kapasitas_tangki: '',
masa_berlakukeur: '',
masa_berlakupajak: '',
masa_berlakustnk: '',
masa_berlakutera: '',
nomor_polisi: '',

safety_switch: false,
sim_Amt1: '',
sim_Amt2: '',
t2_belakang: '',
t2_depan: '',
t2_tengah1: '',
t2_tengah2: '',
tanggal_pemeriksaan: '',
temuan: '',
umur_tangki: '',
userId

      });
    }
    setModalIsOpen(true);
  };
  
  const closeModal = () => {
    // Reset form data
    setFormData({
      Batteraiaccu1: false,
Batteraiaccu2: false,
Batteraiaccu3: false,
Batteraiaccu4: false,
Nama_perusahaan: '',
verifikasi: '',
foto: '',

kabellistrik1: false,
kabellistrik2: false,
kabellistrik3: false,
kabellistrik4: false,
kabellistrik5: false,
kapasitas_tangki: '',
masa_berlakukeur: '',
masa_berlakupajak: '',
masa_berlakustnk: '',
masa_berlakutera: '',
nomor_polisi: '',

safety_switch: false,
sim_Amt1: '',
sim_Amt2: '',
t2_belakang: '',
t2_depan: '',
t2_tengah1: '',
t2_tengah2: '',
tanggal_pemeriksaan: '',
temuan: '',
umur_tangki: '',
userId

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
          Batteraiaccu1: false,
          Batteraiaccu2: false,
          Batteraiaccu3: false,
          Batteraiaccu4: false,
          Nama_perusahaan: '',
          verifikasi: '',
          foto: '',
         
          kabellistrik1: false,
          kabellistrik2: false,
          kabellistrik3: false,
          kabellistrik4: false,
          kabellistrik5: false,
          kapasitas_tangki: '',
          masa_berlakukeur: '',
          masa_berlakupajak: '',
          masa_berlakustnk: '',
          masa_berlakutera: '',
          nomor_polisi: '',
         
          safety_switch: false,
          sim_Amt1: '',
          sim_Amt2: '',
          t2_belakang: '',
          t2_depan: '',
          t2_tengah1: '',
          t2_tengah2: '',
          tanggal_pemeriksaan: '',
          temuan: '',
          umur_tangki: '',
          userId: userId || '',
          
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
            <th>Nama perusahaan</th>
            <th>Temuan</th>
            <th>status</th>
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
