import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPetugas = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data Petugas</h2>
      <form onSubmit={onSubmit}>
        <label>Nomor Petugas:</label>
        <input 
          type="text" 
          name="nomor_petugas" 
          value={formData.nomor_petugas} 
          onChange={onChange} 
          required 
        />

        <label>Nama Petugas:</label>
        <input 
          type="text" 
          name="nama_petugas" 
          value={formData.nama_petugas} 
          onChange={onChange} 
          required 
        />
        
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPetugas;
