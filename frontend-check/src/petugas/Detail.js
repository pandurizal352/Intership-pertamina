import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Gunakan CSS yang sama atau buat yang baru untuk styling modal

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const DetailPetugasModal = ({ isOpen, onRequestClose, petugasDetail }) => {
  if (!petugasDetail) return null; // Jika tidak ada data petugas, jangan tampilkan apapun

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detail Petugas"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Detail Petugas</h2>
      <div className="petugas-details">
        <p><strong>Nomor Petugas:</strong> {petugasDetail.nomor_petugas}</p>
        <p><strong>Nama Petugas:</strong> {petugasDetail.nama_petugas}</p>
        {/* Tambahkan informasi lain yang ingin ditampilkan */}
      </div>
      <div className="modal-buttons">
        <button className="modal-close-button" onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default DetailPetugasModal;
