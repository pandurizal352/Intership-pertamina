import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Addsopir = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data Sopir</h2>
      <form onSubmit={onSubmit}>
        <label>Nama Sopir:</label>
        <input type="text" name="nama_sopir" value={formData.nama_sopir} onChange={onChange} required />

        <label>Nomor LO:</label>
        <input type="text" name="nomer_LO" value={formData.nomer_LO} onChange={onChange} required />
        
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default Addsopir;
