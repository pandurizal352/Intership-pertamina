import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Gunakan CSS yang sama atau buat yang baru untuk styling modal

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const DetailPemeriksaanModal = ({ isOpen, onRequestClose, pemeriksaan }) => {
  if (!pemeriksaan) return null; // Pastikan nama props sesuai

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detail Pemeriksaan"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Detail Pemeriksaan</h2>
      <div className="pemeriksaan-details"> {/* Periksa nama kelas CSS */}
        <p><strong>Tanggal Pemeriksaan:</strong> {pemeriksaan.tanggal_pemeriksaan}</p>
        <p><strong>Jenis Pemeriksaan:</strong> {pemeriksaan.jenis_pemeriksaan}</p>
        <p><strong>Penjelasan:</strong> {pemeriksaan.penjelasan}</p>
        <p><strong>Keterangan:</strong> {pemeriksaan.keterangan}</p>
        <p><strong>Status:</strong> {pemeriksaan.status}</p>
        <p><strong>Foto:</strong> {pemeriksaan.foto}</p>
        <p><strong>Safety Switch:</strong> {pemeriksaan.safety_switch ? 'Yes' : 'No'}</p>
        <p><strong>Kabel Listrik 1:</strong> {pemeriksaan.kabellistrik1 ? 'Yes' : 'No'}</p>
        <p><strong>Kabel Listrik 2:</strong> {pemeriksaan.kabellistrik2 ? 'Yes' : 'No'}</p>
        <p><strong>Kabel Listrik 3:</strong> {pemeriksaan.kabellistrik3 ? 'Yes' : 'No'}</p>
        <p><strong>Kabel Listrik 4:</strong> {pemeriksaan.kabellistrik4 ? 'Yes' : 'No'}</p>
        <p><strong>Kabel Listrik 5:</strong> {pemeriksaan.kabellistrik5 ? 'Yes' : 'No'}</p>
        <p><strong>Batterai Accu 1:</strong> {pemeriksaan.Batteraiaccu1 ? 'Yes' : 'No'}</p>
        <p><strong>Batterai Accu 2:</strong> {pemeriksaan.Batteraiaccu2 ? 'Yes' : 'No'}</p>
        <p><strong>Batterai Accu 3:</strong> {pemeriksaan.Batteraiaccu3 ? 'Yes' : 'No'}</p>
        <p><strong>Batterai Accu 4:</strong> {pemeriksaan.Batteraiaccu4 ? 'Yes' : 'No'}</p>
      </div>
      <div className="modal-buttons">
        <button className="modal-close-button" onClick={onRequestClose}>Close</button>
      </div>
    </Modal>
  );
};

export default DetailPemeriksaanModal;
