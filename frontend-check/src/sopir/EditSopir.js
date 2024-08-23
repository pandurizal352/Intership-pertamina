import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const EditSopir = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data</h2>
      <form onSubmit={onSubmit}>
     
        
        <label>Nama sopir:</label>
        <input type="text"name="regu_name" value={formData.nama_sopir} onChange={onChange} required />
        <label>Nama LO:</label>
        <input type="text"name="regu_name" value={formData.nama_LO}onChange={onChange} required />


        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditSopir;
