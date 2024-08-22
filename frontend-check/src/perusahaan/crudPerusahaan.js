import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
import AddPerusahaan from './AddPerusahaan'; // Pastikan jalur impor benar
import '../components/CRUD.css';

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const CrudPerusahaan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id_perusahaan: '',
    tanggal_cek_fisik: '',
    nomor_polisi: '',
    nama_perusahaan: '',
  });

  const [dataPerusahaan, setDataPerusahaan] = useState([]);

  // Fetch data dari backend
  useEffect(() => {
    fetch('http://localhost:3000/api/perusahaan')
      .then(response => response.json())
      .then(data => {
        console.log('Data fetched:', data);
        setDataPerusahaan(data.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    console.log('Search term:', searchTerm);
    // Implement search logic here
  };

  const handleDetailClick = () => {
    console.log('Detail clicked');
    // Implement detail logic here
  };

  const handleEditClick = () => {
    console.log('Edit clicked');
    // Implement edit logic here
  };

  const handleDeleteClick = () => {
    console.log('Delete clicked');
    // Implement delete logic here
  };


  const handlePdfExport = () => {
    console.log('PDF Export');
    // Implementasikan logika ekspor PDF di sini
  };

  const handleExcelExport = () => {
    console.log('Excel Export');
    // Implementasikan logika ekspor Excel di sini
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
    // Implement form submission logic here
    closeModal();
  };

  return (
    <div className="perusahaan">
      <h2>CRUD Perusahaan</h2>
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
            <th>ID Perusahaan</th>
            <th>Tanggal Cek Fisik</th>
            <th>Nomor Polisi</th>
            <th>Nama Perusahaan</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {dataPerusahaan.map((perusahaan) => (
            <tr key={perusahaan.id_perusahaan}>
              <td>{perusahaan.id_perusahaan}</td>
              <td>{perusahaan.tanggal_cek_fisik}</td>
              <td>{perusahaan.nomor_polisi}</td>
              <td>{perusahaan.nama_perusahaan}</td>
              <td>
                <div className="action-buttons">
                  <button className="action-button-detail" onClick={handleDetailClick}><FaInfoCircle />detail</button>
                  <button className="action-button-edit" onClick={handleEditClick}><FaRegEdit />edit</button>
                  <button className="action-button-hapus" onClick={handleDeleteClick}><FaRegTrashAlt />hapus</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddPerusahaan
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CrudPerusahaan;













// import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
// import { FaRegEdit, FaRegTrashAlt, FaInfoCircle } from 'react-icons/fa';
// import AddReguRls from './AddReguRls'; // Pastikan jalur impor benar
// import EditReguRls from './EditReguRls';
// import './CRUD.css';

// // Set the app element to avoid accessibility issues
// Modal.setAppElement('#root');

// const CrudReguRls = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [dataRegu, setDataRegu] = useState([]);//untuk fecth data
//   const [editModalIsOpen, setEditModalIsOpen] = useState(false);
//   const [currentEditData, setCurrentEditData] = useState({ id_regu: '', regu_name: '' });
//   const [formData, setFormData] = useState({
//     id_regu: '',
//     regu_name: ''
//   });


// const fetchData = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/regu');
//     if (response.ok) {
//       const data = await response.json();
//       setDataRegu(data.data); // Asumsikan `data.data` berisi array dari data regu
//     } else {
//       console.error('Gagal mengambil data');
//     }
//   } catch (error) {
//     console.error('Terjadi kesalahan:', error);
//   }
// };

//   // Fetch data dari backend
//   useEffect(() => {
//     fetch('http://localhost:5000/regu')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Data fetched:', data);
//         setDataRegu(data.data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchClick = () => {
//     console.log('Search term:', searchTerm);
//     // Implement search logic here
//   };

//   const handleDetailClick = () => {
//     console.log('Detail clicked');
//     // Implement detail logic here
//   };

//   const openEditModal = (regu) => {
//     setCurrentEditData(regu);
//     setEditModalIsOpen(true);
//   };
  
//   const closeEditModal = () => {
//     setEditModalIsOpen(false);
//   };
  
//   const handleEditChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEditData({ ...currentEditData, [name]: value });
//   };
  
//   const handleEditSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/regu/${currentEditData.id_regu}`, { // Endpoint update
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(currentEditData),
//       });
  
//       if (response.ok) {
//         alert('Data berhasil diperbarui');
//         closeEditModal(); // Menutup modal setelah sukses
//         fetchData(); // Mengambil data terbaru
//       } else {
//         alert('Terjadi kesalahan saat memperbarui data');
//       }
//     } catch (error) {
//       console.error('Terjadi kesalahan:', error);
//     }
//   };

//   const handleDeleteClick = async (id) => {
//     if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
//       try {
//         const response = await fetch(`http://localhost:5000/regu/${id}`, {
//           method: 'DELETE',
//         });
  
//         if (response.ok) {
//           alert('Data berhasil dihapus');
//           fetchData(); // Mengambil data terbaru setelah penghapusan
//         } else {
//           const errorData = await response.json();
//           alert(`Terjadi kesalahan saat menghapus data: ${errorData.pesan}`);
//         }
//       } catch (error) {
//         console.error('Terjadi kesalahan:', error);
//       }
//     }
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

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/regu', { // Pastikan endpoint ini benar
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (response.ok) {
//         alert('Data berhasil disimpan');
//         closeModal(); // Menutup modal setelah sukses
//         fetchData(); // Mengambil data terbaru
//       } else {
//         alert('Terjadi kesalahan saat menyimpan data');
//       }
//     } catch (error) {
//       console.error('Terjadi kesalahan:', error);
//     }
//   };
  
  
//   return (
//     <div className="statistics">
//       <h2>CRUD Regu RLS</h2>
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
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID Regu</th>
//             <th>Nama Regu</th>
//             <th>ACTION</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dataRegu.map((regu) => (
//             <tr key={regu.id_regu}>
//               <td>{regu.id_regu}</td>
//               <td>{regu.regu_name}</td>
//               <td>
//                 <div className="action-buttons">
//                   <button className="action-button-detail" onClick={handleDetailClick}><FaInfoCircle />detail</button>
//                   <button className="action-button-edit" onClick={() => openEditModal(regu)}><FaRegEdit />edit</button>
//                   <button className="action-button-hapus" onClick={() => handleDeleteClick(regu.id_regu)}><FaRegTrashAlt />hapus</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <AddReguRls
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         formData={formData}
//         onChange={handleInputChange}
//         onSubmit={handleSubmit}
//       />

// <EditReguRls
//   isOpen={editModalIsOpen}
//   onRequestClose={closeEditModal}
//   formData={currentEditData}
//   onChange={handleEditChange}
//   onSubmit={handleEditSubmit}
// />


//     </div>
    
//   );
// };

// export default CrudReguRls;












