import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';
import Pemeriksaan from './crudpemeriksa';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPemeriksa = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData({
      ...localFormData,
      [name]: value,
    });
    onChange(e); // Update parent component's state
  };

  const handleBooleanChange = (name, value) => {
    setLocalFormData({
      ...localFormData,
      [name]: value === 'true'
    });
    onChange({ target: { name, value: value === 'true' } });
  };

  // Mapping dari nama variabel ke label yang ingin Anda tampilkan
  const labelMapping = {
    safety_switch: 'Semua aliran listrik terisolasi',
    kabellistrik1: 'Konduit pelindung tidak ada yang rusak terpotong, pecag atau tertekuk terjepit',
    kabellistrik2: 'Setiap penyambungan kabel harus dilindungi menggunakan junction box (metode lain tidak boleh, kecuali dilindung junction bor seperti menggunakan isolation, skun, creamping)',
    kabellistrik3: 'Tidak terdapat alat listrik tambahan',
    kabellistrik4: 'Pemantik api (untuk menyalakan rokok)',
    kabellistrik5: 'kabel listrik 5',
    Batteraiaccu1: 'Accu tidak boleh dibawah tangki',
    Batteraiaccu2: 'Posisi accu tidak boleh dekat dengan tetesan',
    Batteraiaccu3: 'Accu harus diberi penutup dari bahan isolator',
    Batteraiaccu4: 'Accu harus diberi penutup dari bahan bakar',
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data Pemeriksaan"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data Pemeriksaan</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="userId"
          value={localFormData.userId || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="date"
          name="tanggal_pemeriksaan"
          placeholder="Tanggal Pemeriksaan"
          value={localFormData.tanggal_pemeriksaan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="Nama_perusahaan"
          placeholder="Nama Perusahaan"
          value={localFormData.Nama_perusahaan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="kapasitas_tangki"
          placeholder="Kapasitas Tangki"
          value={localFormData.kapasitas_tangki || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="nomor_polisi"
          placeholder="Nomor Polisi"
          value={localFormData.nomor_polisi || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakustnk"
          placeholder="Masa Berlaku STNK"
          value={localFormData.masa_berlakustnk || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakupajak"
          placeholder="Masa Berlaku Pajak"
          value={localFormData.masa_berlakupajak || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="sim_Amt1"
          placeholder="SIM AMT 1"
          value={localFormData.sim_Amt1 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="sim_Amt2"
          placeholder="SIM AMT 2"
          value={localFormData.sim_Amt2 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakutera"
          placeholder="Masa Berlaku Tera"
          value={localFormData.masa_berlakutera || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_depan"
          placeholder="T2 Depan"
          value={localFormData.t2_depan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_tengah1"
          placeholder="T2 Tengah 1"
          value={localFormData.t2_tengah1 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_tengah2"
          placeholder="T2 Tengah 2"
          value={localFormData.t2_tengah2 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_belakang"
          placeholder="T2 Belakang"
          value={localFormData.t2_belakang || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakukeur"
          placeholder="Masa Berlaku Keur"
          value={localFormData.masa_berlakukeur || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="umur_tangki"
          placeholder="Umur Tangki"
          value={localFormData.umur_tangki || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="temuan"
          placeholder="Temuan"
          value={localFormData.temuan || ''}
          onChange={handleChange}
          className="input-field"
        />
       

        {Object.keys(labelMapping).map((item) => (
          <div key={item} className="checkbox-group">
            <label>{labelMapping[item]}:</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name={item}
                  value="true"
                  checked={localFormData[item] === true}
                  onChange={(e) => handleBooleanChange(item, e.target.value)}
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name={item}
                  value="false"
                  checked={localFormData[item] === false}
                  onChange={(e) => handleBooleanChange(item, e.target.value)}
                />
                <label className="radio-label">No</label>
              </div>
            </div>
          </div>
        ))}

        <input
          type="text"
          name="verifikasi"
          placeholder="Verifikasi"
          value={localFormData.verifikasi || ''}
          onChange={handleChange}
          className="input-field"
        />

        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPemeriksa;
