import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css';


// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const AddPemeriksa = ({ isOpen, onRequestClose, formData, onChange, onSubmit, dataRegu, dataLine, dataSachet }) => {
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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Tambah Data</h2>
      <form onSubmit={onSubmit}>
        <label>REGU:</label>
        <input type="text" name="percentTepung" value={localFormData.percentTepung} onChange={handleChange} required />

       
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPemeriksa;
