import React, { useState } from 'react';

const PeriksaUser = () => {
  // Initialize state for each field
  const [formData, setFormData] = useState({
    id_perusahaan: '',
    id_petugas: '',
    id_sopir: '',
    tanggal_pemeriksaan: '',
    jenis_pemeriksaan: '',
    penjelasan: '',
    keterangan: '',
    status: '',
    foto: '',
    id_kabelListrik: '',
    id_bateraiAccu: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Pemeriksaan</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID Perusahaan:
          <input
            type="number"
            name="id_perusahaan"
            value={formData.id_perusahaan}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ID Petugas:
          <input
            type="number"
            name="id_petugas"
            value={formData.id_petugas}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ID Sopir:
          <input
            type="number"
            name="id_sopir"
            value={formData.id_sopir}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Tanggal Pemeriksaan:
          <input
            type="date"
            name="tanggal_pemeriksaan"
            value={formData.tanggal_pemeriksaan}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Jenis Pemeriksaan:
          <input
            type="text"
            name="jenis_pemeriksaan"
            value={formData.jenis_pemeriksaan}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Penjelasan:
          <textarea
            name="penjelasan"
            value={formData.penjelasan}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Keterangan:
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Foto URL:
          <input
            type="text"
            name="foto"
            value={formData.foto}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ID Kabel Listrik:
          <input
            type="number"
            name="id_kabelListrik"
            value={formData.id_kabelListrik}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ID Baterai Accu:
          <input
            type="number"
            name="id_bateraiAccu"
            value={formData.id_bateraiAccu}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PeriksaUser;
