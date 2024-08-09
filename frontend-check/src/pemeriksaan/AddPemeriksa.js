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

        <label>LINE:</label>
        <input type="text" name="percentTepung" value={localFormData.percentTepung} onChange={handleChange} required />
        <label>SACHET:</label>
        <input type="text" name="percentTepung" value={localFormData.percentTepung} onChange={handleChange} required />

        <label>VAR Tepung:</label>
        <input type="text" name="varTepung" value={localFormData.varTepung} onChange={handleChange} required />
        
        <label>percent tepung %:</label>
        <input type="text" name="percentTepung" value={localFormData.percentTepung} onChange={handleChange} required />
        
        <label>NILAI tepung:</label>
        <input type="text" name="nilaiTepung" value={localFormData.nilaiTepung} readOnly required />
        
        <label>VAR MG:</label>
        <input type="text" name="varMg" value={localFormData.varMg} onChange={handleChange} required />
        
        <label>percent mg%:</label>
        <input type="text" name="percentMg" value={localFormData.percentMg} onChange={handleChange} required />
        
        <label>NILAI MG:</label>
        <input type="text" name="nilaiMg" value={localFormData.nilaiMg} readOnly required />
        
        <label>VAR Bumbu:</label>
        <input type="text" name="varBumbu" value={localFormData.varBumbu} onChange={handleChange} required />
        
        <label>percent bumbu%:</label>
        <input type="text" name="percentBumbu" value={localFormData.percentBumbu} onChange={handleChange} required />
        
        <label>NILAI Bumbu:</label>
        <input type="text" name="nilaiBumbu" value={localFormData.nilaiBumbu} readOnly required />
        
        <label>VAR Minyak Bumbu:</label>
        <input type="text" name="varMinyakBumbu" value={localFormData.varMinyakBumbu} onChange={handleChange} required />
        
        <label>percent minyak bumbu %:</label>
        <input type="text" name="percentMinyakBumbu" value={localFormData.percentMinyakBumbu} onChange={handleChange} required />
        
        <label>NILAI Minyak Bumbu:</label>
        <input type="text" name="nilaiMinyakBumbu" value={localFormData.nilaiMinyakBumbu} readOnly required />
        
        <label>VAR Karton:</label>
        <input type="text" name="varKarton" value={localFormData.varKarton} onChange={handleChange} required />
        
        <label>percent karton %:</label>
        <input type="text" name="percentKarton" value={localFormData.percentKarton} onChange={handleChange} required />
        
        <label>VAR Solid Inggridien:</label>
        <input type="text" name="varSolidInggridien" value={localFormData.varSolidInggridien} onChange={handleChange} required />
        
        <label>percent Solid Inggridien %:</label>
        <input type="text" name="percentSolidInggridien" value={localFormData.percentSolidInggridien} onChange={handleChange} required />
        
        <label>NILAI Solid Inggridien:</label>
        <input type="text" name="nilaiSolidInggridien" value={localFormData.nilaiSolidInggridien} readOnly required />
        
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default AddPemeriksa;
