import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const EditPetugas = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
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
     
         <label>Tanggal cek fisik:</label>
        <input type="date"name="regu_name" value={formData.tanggal_cek_fisik} onChange={onChange} required />
        <label>Nomor polisi:</label>
        <input type="text"name="regu_name" value={formData.nomor_polisi} onChange={onChange} required />
        <label>Nama perusahaan:</label>
        <input type="text"name="regu_name" value={formData.nama_perusahaan}onChange={onChange} required />


        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPetugas;
