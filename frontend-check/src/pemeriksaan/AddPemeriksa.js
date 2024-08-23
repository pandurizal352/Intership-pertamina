import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPemeriksa = ({ isOpen, onRequestClose, formData, onChange, onSubmit, dataRegu, dataLine, dataSachet }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
    onChange(e); // Update parent component's state
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data Pemeriksaan"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data Pemeriksaan</h2>
      <form onSubmit={onSubmit}>
        <label>ID Perusahaan:</label>
        <input type="text" name="id_perusahaan" value={localFormData.id_perusahaan} onChange={handleChange} required />

        <label>ID Petugas:</label>
        <input type="text" name="id_petugas" value={localFormData.id_petugas} onChange={handleChange} required />

        <label>ID Sopir:</label>
        <input type="text" name="id_sopir" value={localFormData.id_sopir} onChange={handleChange} required />

        <label>Tanggal Pemeriksaan:</label>
        <input type="date" name="tanggal_pemeriksaan" value={localFormData.tanggal_pemeriksaan} onChange={handleChange} required />

        <label>Jenis Pemeriksaan:</label>
        <input type="text" name="jenis_pemeriksaan" value={localFormData.jenis_pemeriksaan} onChange={handleChange} required />

        <label>Penjelasan:</label>
        <textarea name="penjelasan" value={localFormData.penjelasan} onChange={handleChange} required />

        <label>Keterangan:</label>
        <textarea name="keterangan" value={localFormData.keterangan} onChange={handleChange} required />

        <label>Status:</label>
        <input type="text" name="status" value={localFormData.status} onChange={handleChange} required />

        <label>Foto:</label>
        <input type="file" name="foto" onChange={handleChange} required />

        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPemeriksa;
