import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; 

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPetugas = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
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
      <h2>Tambah Data Petugas</h2>
      {loading && <p>Loading users...</p>}
      {error && <p>Error fetching users: {error.message}</p>}
      {!loading && !error && (
        <form onSubmit={onSubmit}>
          <label>Nomor Petugas:</label>
          <input 
            type="text" 
            name="nomor_petugas" 
            value={formData.nomor_petugas} 
            onChange={onChange} 
            required 
          />

          <label>Nama Petugas:</label>
          <input 
            type="text" 
            name="nama_petugas" 
            value={formData.nama_petugas} 
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
                {user.id} {/* Menampilkan nama user */}
              </option>
            ))}
          </select>

          <div className="modal-buttons">
            <button type="submit" className="modal-submit-button">Submit</button>
            <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default AddPetugas;
