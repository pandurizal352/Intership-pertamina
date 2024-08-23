// import AddPerusahaan from './AddPerusahaan';
import React, { useState, useEffect } from 'react';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import '../components/CRUD.css';

const CrudPerusahaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteModalIsOpen, setConfirmDeleteModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    id_perusahaan: '',
    tanggal_cek_fisik: '',
    nomor_polisi: '',
    nama_perusahaan: '',
  });

  const [dataPerusahaan, setDataPerusahaan] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/perusahaan')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setDataPerusahaan(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
  };

  const handleDetailClick = (id) => {
    console.log('Detail clicked for ID:', id);
  };

  const handleEditClick = (id) => {
    setIsEditMode(true);
    setSelectedId(id);
    fetch(`http://localhost:5000/Perusahaan/${id}`)
      .then(response => response.json())
      .then(data => {
        setFormData(data);
        setModalIsOpen(true);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmDeleteModalIsOpen(true);
  };

  const confirmDelete = () => {
    fetch(`http://localhost:5000/Perusahaan/${selectedId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setDataPerusahaan(dataPerusahaan.filter(perusahaan => perusahaan.id_perusahaan !== selectedId));
        } else {
          console.error('Error deleting data:', response);
        }
      })
      .catch(error => console.error('Error:', error))
      .finally(() => setConfirmDeleteModalIsOpen(false));
  };

  const handlePdfExport = () => {
    console.log('PDF Export');
  };

  const handleExcelExport = () => {
    console.log('Excel Export');
  };

  const openModal = () => {
    setIsEditMode(false);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setFormData({
      id_perusahaan: '',
      tanggal_cek_fisik: '',
      nomor_polisi: '',
      nama_perusahaan: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = isEditMode
      ? `http://localhost:5000/Perusahaan/${selectedId}`
      : 'http://localhost:5000/perusahaan';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (isEditMode) {
          setDataPerusahaan(dataPerusahaan.map(perusahaan =>
            perusahaan.id_perusahaan === selectedId ? data : perusahaan
          ));
        } else {
          setDataPerusahaan([...dataPerusahaan, data]);
        }
        closeModal();
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="perusahaan">
      <h2>CRUD Perusahaan</h2>
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
            <th>ID Perusahaan</th>
            <th>Tanggal Cek Fisik</th>
            <th>Nomor Polisi</th>
            <th>Nama Perusahaan</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dataPerusahaan && dataPerusahaan.length > 0 ? (
            dataPerusahaan.map((perusahaan) => (
              <tr key={perusahaan.id_perusahaan}>
                <td>{perusahaan.id_perusahaan}</td>
                <td>{perusahaan.tanggal_cek_fisik}</td>
                <td>{perusahaan.nomor_polisi}</td>
                <td>{perusahaan.nama_perusahaan}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button-detail" onClick={() => handleDetailClick(perusahaan.id_perusahaan)}><FaInfoCircle /> detail</button>
                    <button className="action-button-edit" onClick={() => handleEditClick(perusahaan.id_perusahaan)}><FaRegEdit /> edit</button>
                    <button className="action-button-hapus" onClick={() => handleDeleteClick(perusahaan.id_perusahaan)}><FaRegTrashAlt /> hapus</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal Konfirmasi Delete */}
      {confirmDeleteModalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Konfirmasi Penghapusan</h3>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setConfirmDeleteModalIsOpen(false)}>
                Tidak
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Ya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah/Edit Data */}
      {modalIsOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{isEditMode ? 'Edit Perusahaan' : 'Tambah Perusahaan'}</h3>
            <form onSubmit={handleSubmit}>
              <label>ID Perusahaan</label>
              <input
                type="text"
                name="id_perusahaan"
                value={formData.id_perusahaan}
                onChange={handleInputChange}
                required
              />
              <label>Tanggal Cek Fisik</label>
              <input
                type="date"
                name="tanggal_cek_fisik"
                value={formData.tanggal_cek_fisik}
                onChange={handleInputChange}
                required
              />
              <label>Nomor Polisi</label>
              <input
                type="text"
                name="nomor_polisi"
                value={formData.nomor_polisi}
                onChange={handleInputChange}
                required
              />
              <label>Nama Perusahaan</label>
              <input
                type="text"
                name="nama_perusahaan"
                value={formData.nama_perusahaan}
                onChange={handleInputChange}
                required
              />
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? 'Simpan Perubahan' : 'Tambah Data'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudPerusahaan;