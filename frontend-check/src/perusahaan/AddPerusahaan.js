import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPerusahaan = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  const [userId, setUserId] = useState('');

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user) {
  //     setUserId(user.id);
  //   }
  // }, []);

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
        <label>Tanggal Cek Fisik:</label>
        <input 
          type="date" 
          name="tanggal_cek_fisik" 
          value={formData.tanggal_cek_fisik} 
          onChange={onChange} 
          required 
        />

        <label>Nomor Polisi:</label>
        <input 
          type="text" 
          name="nomor_polisi" 
          value={formData.nomor_polisi} 
          onChange={onChange} 
          required 
        />

        {/* <label>id user</label>
        <input 
          type="text" 
          name="id_user" 
          value={userId} 
          onChange={onChange} 
          required 
          readOnly 
        /> */}
        
        <label>Nama Perusahaan:</label>
        <input 
          type="text" 
          name="nama_perusahaan" 
          value={formData.nama_perusahaan} 
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


export default AddPerusahaan;
