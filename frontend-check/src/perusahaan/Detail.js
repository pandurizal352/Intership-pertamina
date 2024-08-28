import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Gunakan CSS yang sama atau buat yang baru untuk styling modal

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const DetailPerusahaanModal = ({ isOpen, onRequestClose, perusahaan }) => {
  if (!perusahaan) return null; // Pastikan nama props sesuai

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detail Perusahaan"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Detail Perusahaan</h2>
      <div className="perusahaan-details"> {/* Periksa nama kelas CSS */}
        <p><strong>Tanggal Cek Fisik:</strong> {perusahaan.tanggal_cek_fisik}</p>
        <p><strong>Nomor Polisi:</strong> {perusahaan.nomor_polisi}</p>
        <p><strong>Nama Perusahaan:</strong> {perusahaan.nama_perusahaan}</p>
      </div>
      <div className="modal-buttons">
        <button className="modal-close-button" onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};


export default DetailPerusahaanModal;
