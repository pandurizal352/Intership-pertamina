import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';

const AddPetugas = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Tambah Data Ekspor Normal Nodle</h2>
      <form onSubmit={onSubmit}>
        <label>
          Nomor petugas
          <input type="text" name="nomor_petugas" value={formData.nomor_petugas} onChange={onChange} />
        </label>
        <label>
          Nama petugas
          <input type="text" name="nama_petugas" value={formData.nomor_petugas} onChange={onChange} />
        </label>
        
        <button type="submit">Submit</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddPetugas;
