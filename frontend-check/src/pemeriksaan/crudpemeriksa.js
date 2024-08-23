import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPemeriksa from './AddPemeriksa'; // Pastikan jalur impor benar
import '../components/CRUD.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Pemeriksaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
  });

  // Fetch data dari backend
  // useEffect(() => {
  //   fetch('http://localhost:5000/pemeriksaan')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Data fetched:', data);
  //       setDataPemeriksaan(data.data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));  
  // }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
    // Implementasikan logika pencarian di sini
  };

  const handlePdfExport = () => {
    console.log('PDF Export');
    // Implementasikan logika ekspor PDF di sini
  };

  const handleExcelExport = () => {
    console.log('Excel Export');
    // Implementasikan logika ekspor Excel di sini
  };

  const handleDetailClick = () => {
    console.log('Detail clicked');
    // Implementasikan logika detail di sini
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
    // Implementasikan logika edit di sini
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
    // Implementasikan logika hapus di sini
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Implementasikan logika pengiriman formulir di sini
    closeModal();
  };

  return (
    <div className="pemeriksaan">
      <h2>Manajemen Pemeriksaan</h2>
      <button className="add-data-button" onClick={openModal}>Tambah data</button>

      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Cari data..." 
          aria-label="Cari data" 
          aria-describedby="button-addon2" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button 
          className="btn btn-outline-secondary search-button" 
          type="button" 
          id="button-addon2" 
          onClick={handleSearchClick}
        >
          Cari
        </button>
        <button 
          className="export-button pdf-button" 
          type="button" 
          onClick={handlePdfExport}
        >
          Ekspor PDF
        </button>
        <button 
          className="export-button excel-button" 
          type="button" 
          onClick={handleExcelExport}
        >
          Ekspor Excel
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Nama petugas</th>
            <th>ID Petugas</th>
            <th>ID Sopir</th>
            <th>Tanggal Pemeriksaan</th>
            <th>Jenis Pemeriksaan</th>
            <th>Penjelasan</th>
            <th>Keterangan</th>
            <th>Status</th>
            <th>Foto</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {dataPemeriksaan.map((pemeriksaan) => (
            <tr key={pemeriksaan.id_pemeriksaan}>
              <td>{pemeriksaan.id_perusahaan}</td>
              <td>{pemeriksaan.id_petugas}</td>
              <td>{pemeriksaan.id_sopir}</td>
              <td>{pemeriksaan.tanggal_pemeriksaan}</td>
              <td>{pemeriksaan.jenis_pemeriksaan}</td>
              <td>{pemeriksaan.penjelasan}</td>
              <td>{pemeriksaan.keterangan}</td>
              <td>{pemeriksaan.status}</td>
              <td>{pemeriksaan.foto}</td> */}
          <tr>
              <td>id perusahaan</td>
              <td>id petugas</td>
              <td>id sopir</td>
              <td>tanggal_pemeriksaan</td>
              <td>jenis_pemeriksaan</td>
              <td>penjelasan</td>
              <td>keterangan</td>
              <td>status</td>
              <td>foto</td>
             
              <td>
                <div className="action-buttons">
                  <button className="action-button-detail" onClick={handleDetailClick}><FaInfoCircle />Detail</button>
                  <button className="action-button-edit" onClick={handleEditClick}><FaRegEdit />Edit</button>
                  <button className="action-button-hapus" onClick={handleDeleteClick}><FaRegTrashAlt />Hapus</button>
                </div>
              </td>
            </tr>
          {/* ))} */}
        </tbody>
      </table>

      <AddPemeriksa
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        
      />
    </div>
  );
};

export default Pemeriksaan;














// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
// import AddPemeriksa from './AddPemeriksa'; // Pastikan jalur impor benar
// import './CRUD.css';

// // Set the app element to avoid accessibility issues
// Modal.setAppElement('#root');

// const AddPemeriksa = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   // const [dataCnLokal, setDataCnLokal] = useState([]); // untuk fetch data
//   const [formData, setFormData] = useState({
//     id_regu: '',
//     id_line: '',
//     id_sachet: '',
//     var_tpg: '',
//     persen_var_tpg: '',
//     nilai_var_tpg: '',
//     var_mg: '',
//     persen_var_mg: '',
//     nilai_var_mg: '',
//     var_bb: '',
//     persen_var_bb: '',
//     nilai_var_bb: '',
//     var_mb: '',
//     persen_var_mb: '',
//     nilai_var_mb: '',
//     var_car: '',
//     persen_var_car: '',
//     var_si: '',
//     persen_var_si: '',
//     nilai_var_si: '',
//   });

//   // Fetch data dari backend
//   // useEffect(() => {
//   //   fetch('http://localhost:5000/cnlokal')
//   //     .then(response => response.json())
//   //     .then(data => {
//   //       console.log('Data fetched:', data);
//   //       setDataCnLokal(data.data);
//   //     })
//   //     .catch(error => console.error('Error fetching data:', error));  
//   // }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchClick = () => {
//     console.log('Search term:', searchTerm);
//     // Implement search logic here
//   };

//   const handlePdfExport = () => {
//     console.log('PDF Export');
//     // Implement PDF export logic here
//   };

//   const handleExcelExport = () => {
//     console.log('Excel Export');
//     // Implement Excel export logic here
//   };

//   const handleDetailClick = () => {
//     console.log('Detail clicked');
//     // Implement detail logic here
//   };

//   const handleEditClick = () => {
//     console.log('Edit clicked');
//     // Implement edit logic here
//   };

//   const handleDeleteClick = () => {
//     console.log('Delete clicked');
//     // Implement delete logic here
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log('Form Data:', formData);
//     // Implement form submission logic here
//     closeModal();
//   };

//   return (
//     <div className="statistics">
//       <h2>Crud CN Lokal</h2>
//       <button className="add-data-button" onClick={openModal}>Tambah data</button>

//       <div className="input-group mb-3">
//         <input 
//           type="text" 
//           className="form-control" 
//           placeholder="Cari data..." 
//           aria-label="Cari data" 
//           aria-describedby="button-addon2" 
//           value={searchTerm} 
//           onChange={handleSearchChange} 
//         />
//         <button 
//           className="btn btn-outline-secondary search-button" 
//           type="button" 
//           id="button-addon2" 
//           onClick={handleSearchClick}
//         >
//           Cari
//         </button>
//         <button 
//           className="export-button pdf-button" 
//           type="button" 
//           onClick={handlePdfExport}
//         >
//           Ekstrak PDF
//         </button>
//         <button 
//           className="export-button excel-button" 
//           type="button" 
//           onClick={handleExcelExport}
//         >
//           Ekstrak Excel
//         </button>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>REGU</th>
//             <th>LINE</th>
//             <th>SACHET</th>
//             <th>VAR Tepung</th>
//             <th>PERSEN VAR TPG</th>
//             <th>NILAI VAR TPG</th>
//             <th>VAR MG</th>
//             <th>PERSEN VAR MG</th>
//             <th>NILAI VAR MG</th>
//             <th>VAR Bumbu</th>
//             <th>PERSEN VAR Bumbu</th>
//             <th>NILAI VAR Bumbu</th>
//             <th>VAR Minyak Bumbu</th>
//             <th>PERSEN VAR Minyak Bumbu</th>
//             <th>NILAI VAR Minyak Bumbu</th>
//             <th>VAR Karton</th>
//             <th>PERSEN VAR Karton</th>
//             <th>VAR Solid Inggridien</th>
//             <th>PERSEN VAR Solid Inggridien</th>
//             <th>NILAI VAR Solid Inggridien</th>
//             <th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dataCnLokal.map((cnl) => (
//             <tr key={cnl.id_regu}>
//            <td>Example REGU</td>
//              <td>Example LINE</td>
//              <td>Example SACHET</td>
//              <td>Example VAR TPG</td>
//              <td>Example %</td>
//              <td>Example NILAI</td>
//              <td>Example VAR MG</td>
//              <td>Example %</td>
//              <td>Example NILAI</td>
//              <td>Example VAR BB</td>
//              <td>Example %</td>
//              <td>Example NILAI</td>
//              <td>Example VAR MB</td>
//              <td>Example %</td>
//              <td>Example NILAI</td>
//              <td>Example VAR CAR</td>
//              <td>Example %</td>
//              <td>Example VAR SI</td>
//              <td>Example %</td>
//              <td>Example NILAI</td>
//               <td>
//                 <div className="action-buttons">
//                   <button className="action-button-detail" onClick={handleDetailClick}><FaInfoCircle />detail</button>
//                   <button className="action-button-edit" onClick={handleEditClick}><FaRegEdit />edit</button>
//                   <button className="action-button-hapus" onClick={handleDeleteClick}><FaRegTrashAlt />hapus</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <AddPemeriksa
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         formData={formData}
//         onChange={handleInputChange}
//         onSubmit={handleSubmit}
//         dataRegu={dataRegu}
//         dataLine={dataLine}
//         dataSachet={dataSachet}
//       />
//     </div>
//   );
// };

// export default AddPemeriksa;










