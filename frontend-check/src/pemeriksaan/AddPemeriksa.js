import React from 'react';
import Modal from 'react-modal';

const AddPemeriksa = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Pemeriksa">
      <h2>Tambah Pemeriksaan</h2>
      <form onSubmit={onSubmit}>
        <label>
          Tanggal Pemeriksaan:
          <input
            type="date"
            name="tanggal_pemeriksaan"
            value={formData.tanggal_pemeriksaan}
            onChange={onChange}
          />
        </label>
        <label>
          Jenis Pemeriksaan:
          <input
            type="text"
            name="jenis_pemeriksaan"
            value={formData.jenis_pemeriksaan}
            onChange={onChange}
          />
        </label>
        <label>
          Penjelasan:
          <textarea
            name="penjelasan"
            value={formData.penjelasan}
            onChange={onChange}
          />
        </label>
        <label>
          Keterangan:
          <input
            type="text"
            name="keterangan"
            value={formData.keterangan}
            onChange={onChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={onChange}
          />
        </label>
        <label>
          Foto URL:
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={onChange}
          />
        </label>
        <label>
          Safety Switch:
          <input
            type="checkbox"
            name="safety_switch"
            checked={formData.safety_switch}
            onChange={onChange}
          />
        </label>
        <label>
          Kabel Listrik 1:
          <input
            type="checkbox"
            name="kabellistrik1"
            checked={formData.kabellistrik1}
            onChange={onChange}
          />
        </label>
        <label>
          Kabel Listrik 2:
          <input
            type="checkbox"
            name="kabellistrik2"
            checked={formData.kabellistrik2}
            onChange={onChange}
          />
        </label>
        <label>
          Kabel Listrik 3:
          <input
            type="checkbox"
            name="kabellistrik3"
            checked={formData.kabellistrik3}
            onChange={onChange}
          />
        </label>
        <label>
          Kabel Listrik 4:
          <input
            type="checkbox"
            name="kabellistrik4"
            checked={formData.kabellistrik4}
            onChange={onChange}
          />
        </label>
        <label>
          Kabel Listrik 5:
          <input
            type="checkbox"
            name="kabellistrik5"
            checked={formData.kabellistrik5}
            onChange={onChange}
          />
        </label>
        <label>
          Baterai Accu 1:
          <input
            type="checkbox"
            name="Batteraiaccu1"
            checked={formData.Batteraiaccu1}
            onChange={onChange}
          />
        </label>
        <label>
          Baterai Accu 2:
          <input
            type="checkbox"
            name="Batteraiaccu2"
            checked={formData.Batteraiaccu2}
            onChange={onChange}
          />
        </label>
        <label>
          Baterai Accu 3:
          <input
            type="checkbox"
            name="Batteraiaccu3"
            checked={formData.Batteraiaccu3}
            onChange={onChange}
          />
        </label>
        <label>
          Baterai Accu 4:
          <input
            type="checkbox"
            name="Batteraiaccu4"
            checked={formData.Batteraiaccu4}
            onChange={onChange}
          />
        </label>
        <button type="submit">Simpan</button>
        <button type="button" onClick={onRequestClose}>Tutup</button>
      </form>
    </Modal>
  );
};

export default AddPemeriksa;
