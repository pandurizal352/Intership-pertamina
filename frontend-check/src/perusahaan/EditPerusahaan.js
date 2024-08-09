import React from 'react';
import Modal from 'react-modal';
import './AddDataModal.css'; // Pastikan file CSS ini ada di direktori yang sama

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const EditPerusahaan = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
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
        <label>Nama Regu:</label>
        <input
          type="text"
          name="regu_name"
          value={formData.regu_name}
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

export default EditPerusahaan;
