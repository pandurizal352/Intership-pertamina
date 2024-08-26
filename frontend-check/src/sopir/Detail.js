import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Menggunakan CSS yang sama

Modal.setAppElement('#root'); // Set elemen aplikasi untuk modal

const DetailSopirModal = ({ isOpen, onRequestClose, sopirDetail }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detail Sopir"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Detail Sopir</h2>
      {sopirDetail ? (
        <div>
          <p><strong>ID Sopir     :</strong> {sopirDetail.id_sopir}</p>
          <p><strong>Nama Sopir :</strong> {sopirDetail.nama_sopir}</p>
          <p><strong>Nomer LO     :</strong> {sopirDetail.nomer_LO}</p>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Tutup</button>
        </div>
      ) : (
        <p>Loading...</p> // Menampilkan loading jika data sopir belum tersedia
      )}
    </Modal>
  );
};

export default DetailSopirModal;
