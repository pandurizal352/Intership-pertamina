import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HalamanPemeriksaan.css';

function Inputdatapemeriksaan({ formData = {}, setFormData, handleSubmit }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBooleanChange = (name, value) => {
    setFormData({ ...formData, [name]: value === 'true' });
  };

  return (
    <div className="pemeriksaan-container">
      <div className="pemeriksaan-form-container">
        <h2 className="pemeriksaan-title">Halaman Pemeriksaan</h2>

        <input
          type="text"
          name="tanggal_pemeriksaan"
          placeholder="Tanggal Pemeriksaan"
          value={formData.tanggal_pemeriksaan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="Nama_perusahaan"
          placeholder="Nama Perusahaan"
          value={formData.Nama_perusahaan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="kapasitas_tangki"
          placeholder="Kapasitas Tangki"
          value={formData.kapasitas_tangki || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="nomor_polisi"
          placeholder="Nomor Polisi"
          value={formData.nomor_polisi || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakustnk"
          placeholder="Masa Berlaku STNK"
          value={formData.masa_berlakustnk || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakupajak"
          placeholder="Masa Berlaku Pajak"
          value={formData.masa_berlakupajak || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="sim_Amt1"
          placeholder="SIM AMT 1"
          value={formData.sim_Amt1 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="sim_Amt2"
          placeholder="SIM AMT 2"
          value={formData.sim_Amt2 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakutera"
          placeholder="Masa Berlaku Tera"
          value={formData.masa_berlakutera || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_depan"
          placeholder="T2 Depan"
          value={formData.t2_depan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_tengah1"
          placeholder="T2 Tengah 1"
          value={formData.t2_tengah1 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_tengah2"
          placeholder="T2 Tengah 2"
          value={formData.t2_tengah2 || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="t2_belakang"
          placeholder="T2 Belakang"
          value={formData.t2_belakang || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="masa_berlakukeur"
          placeholder="Masa Berlaku Keur"
          value={formData.masa_berlakukeur || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="umur_tangki"
          placeholder="Umur Tangki"
          value={formData.umur_tangki || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="text"
          name="temuan"
          placeholder="Temuan"
          value={formData.temuan || ''}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="file"
          name="foto"
          placeholder="foto"
          value={formData.foto || ''}
          onChange={handleChange}
          className="input-field"
        />
        {/* <input
          type="text"
          name="Verifikasi"
          placeholder="Verifikasi (optional)"
          value={formData.Verifikasi || ''}
          onChange={handleChange}
          className="input-field"
        /> */}

 {[
          'safety_switch',
          'Semua aliran listrik terisolasi',
          'Konduit pelindung tidak ada yang rusak terpotong, pecag atau tertekuk terjepit',
          'Setiap penyambungan kabel harus dilindungi menggunakan junction box (metode lain tidak boleh, kecuali dilindung junction bor seperti menggunakan isolation , skun, creampinhg)',
          'Tidakterdapat alat listrik tambahan',
          'Pemantik api',
          'Accu tidak boleh dibawah tangki',
          'posisi accu tidak boleh dekat dengan tetesan',
          'bukan harus diberi penutup dari bahan isolator',
          'accu harus diberi penutup dari bahan bakar'
        ].map((item) => (
          <div key={item} className="checkbox-group">
            <label>{item}:</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  name={item}
                  value="true"
                  checked={formData[item] === true}
                  onChange={(e) => handleBooleanChange(item, e.target.value)}
                />
                <label className="radio-label">Yes</label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  name={item}
                  value="false"
                  checked={formData[item] === false}
                  onChange={(e) => handleBooleanChange(item, e.target.value)}
                />
                <label className="radio-label">No</label>
              </div>
            </div>
          </div>
        ))}

        <div className="button-container">
          
          <button
            onClick={handleSubmit}
            className="button button-submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inputdatapemeriksaan;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HalamanPemeriksaan.css';

// function Inputdatapemeriksaan({ formData = {}, setFormData, handleSubmit }) {
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleBooleanChange = (name, value) => {
//     setFormData({ ...formData, [name]: value === 'true' });
//   };

//   return (
//     <div className="pemeriksaan-container">
//       <div className="pemeriksaan-form-container">
//         <h2 className="pemeriksaan-title">Halaman Pemeriksaan</h2>

//         <input
//           type="text"
//           name="tanggal_pemeriksaan"
//           placeholder="Tanggal Pemeriksaan"
//           value={formData.tanggal_pemeriksaan || ''}
//           onChange={handleChange}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="jenis_pemeriksaan"
//           placeholder="Jenis Pemeriksaan"
//           value={formData.jenis_pemeriksaan || ''}
//           onChange={handleChange}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="penjelasan"
//           placeholder="Penjelasan"
//           value={formData.penjelasan || ''}
//           onChange={handleChange}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="keterangan"
//           placeholder="Keterangan"
//           value={formData.keterangan || ''}
//           onChange={handleChange}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="status"
//           placeholder="Status"
//           value={formData.status || ''}
//           onChange={handleChange}
//           className="input-field"
//         />
//         <input
//           type="text"
//           name="foto"
//           placeholder="Foto URL"
//           value={formData.foto || ''}
//           onChange={handleChange}
//           className="input-field"
//         />

//         {[
//           'safety_switch',
//           'Semua aliran listrik terisolasi',
//           'Konduit pelindung tidak ada yang rusak terpotong, pecag atau tertekuk terjepit',
//           'Setiap penyambungan kabel harus dilindungi menggunakan junction box (metode lain tidak boleh, kecuali dilindung junction bor seperti menggunakan isolation , skun, creampinhg)',
//           'Tidakterdapat alat listrik tambahan',
//           'Pemantik api',
//           'Accu tidak boleh dibawah tangki',
//           'posisi accu tidak boleh dekat dengan tetesan',
//           'bukan harus diberi penutup dari bahan isolator',
//           'accu harus diberi penutup dari bahan bakar'
//         ].map((item) => (
//           <div key={item} className="checkbox-group">
//             <label>{item}:</label>
//             <div className="radio-group">
//               <div className="radio-item">
//                 <input
//                   type="radio"
//                   name={item}
//                   value="true"
//                   checked={formData[item] === true}
//                   onChange={(e) => handleBooleanChange(item, e.target.value)}
//                 />
//                 <label className="radio-label">Yes</label>
//               </div>
//               <div className="radio-item">
//                 <input
//                   type="radio"
//                   name={item}
//                   value="false"
//                   checked={formData[item] === false}
//                   onChange={(e) => handleBooleanChange(item, e.target.value)}
//                 />
//                 <label className="radio-label">No</label>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="button-container">
//           <button
//             onClick={() => navigate('/halaman2')}
//             className="button button-back"
//           >
//             Back
//           </button>
//           <button
//             onClick={handleSubmit}
//             className="button button-submit"
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Inputdatapemeriksaan;
