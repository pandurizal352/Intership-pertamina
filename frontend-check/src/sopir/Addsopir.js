import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Addsopir = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
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
      <h2>Tambah Data Sopir</h2>
      <form onSubmit={onSubmit}>
        <label>Nama Sopir:</label>
        <input 
          type="text" 
          name="nama_sopir" 
          value={formData.nama_sopir} 
          onChange={onChange} 
          required 
        />

        <label>Nomor LO:</label>
        <input 
          type="number" 
          name="nomer_LO" 
          value={formData.nomer_LO || ''} 
          onChange={onChange} 
          required 
        />

        <label>User ID:</label>
        <select 
          name="userId" 
          value={formData.userId || ''} 
          onChange={onChange} 
          required
        >
          <option value="">Pilih User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.id} {/* Menampilkan hanya ID user */}
            </option>
          ))}
        </select>

        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default Addsopir;
