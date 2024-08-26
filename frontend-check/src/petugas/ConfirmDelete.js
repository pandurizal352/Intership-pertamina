import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Gunakan CSS yang sama atau buat yang baru untuk styling modal

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const ConfirmDeleteModal = ({ isOpen, onRequestClose, onConfirm, itemName }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Konfirmasi Hapus"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Konfirmasi Hapus</h2>
      <p>Apakah Anda yakin ingin menghapus {itemName}?</p>
      <div className="modal-buttons">
        <button className="modal-submit-button" onClick={onConfirm}>Hapus</button>
        <button className="modal-close-button" onClick={onRequestClose}>Batal</button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;
