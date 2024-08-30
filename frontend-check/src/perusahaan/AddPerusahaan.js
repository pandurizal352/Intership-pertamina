import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPerusahaan = ({ isOpen, onRequestClose, formData, onChange, onSubmit, onUsernameChange }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data Perusahaan</h2>
      <form onSubmit={onSubmit}>
        <label>Tanggal Cek Fisik:</label>
        <input 
          type="date" 
          name="tanggal_cek_fisik" 
          value={formData.tanggal_cek_fisik} 
          onChange={onChange} 
          required 
        />

        <label>Username:</label>
        <select 
          name="userId" 
          value={formData.userId} 
          onChange={(e) => {
            const selectedUserId = e.target.value;
            const selectedUser = users.find(user => user.id === parseInt(selectedUserId));
            onUsernameChange({
              target: { 
                name: 'userId',
                value: selectedUserId
              }
            });
          }} 
          required
        >
          <option value="">Pilih Username</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>

        <label>Nomor Polisi:</label>
        <input 
          type="text" 
          name="nomor_polisi" 
          value={formData.nomor_polisi} 
          onChange={onChange} 
          required 
        />

        <label>Nama Perusahaan:</label>
        <input 
          type="text" 
          name="nama_perusahaan" 
          value={formData.nama_perusahaan} 
          onChange={onChange} 
          required 
        />
        
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPerusahaan;
