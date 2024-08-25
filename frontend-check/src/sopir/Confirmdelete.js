import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Menggunakan CSS yang sama

Modal.setAppElement('#root'); // Set elemen aplikasi untuk modal

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Konfirmasi Hapus"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Konfirmasi Hapus</h2>
      <p>Apakah Anda yakin ingin menghapus data ini?</p>
      <div className="modal-buttons">
        <button type="button" className="modal-submit-button" onClick={onConfirm}>Ya</button>
        <button type="button" className="modal-close-button" onClick={onRequestClose}>Tidak</button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
