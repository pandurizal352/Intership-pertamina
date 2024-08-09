import React from 'react';
import Modal from 'react-modal';
import '../components/AddDataModal.css'; // Ensure this file exists in the same directory

// Set the app element to avoid accessibility issues
Modal.setAppElement('#root');

const Addsopir = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Tambah Data"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {/* <button className="modal-close-button" onClick={onRequestClose}>×</button> */}
      <h2>Tambah Data</h2>
      <form onSubmit={onSubmit}>
        <label>REGU:</label>
        <input type="text" name="regu" value={formData.regu} onChange={onChange} required />
        
        <label>LINE:</label>
        <input type="text" name="line" value={formData.line} onChange={onChange} required />
        
        <label>SACHET:</label>
        <input type="text" name="sachet" value={formData.sachet} onChange={onChange} required />
        
        <label>VAR TPG:</label>
        <input type="text" name="varTepung" value={formData.varTepung} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent1" value={formData.percent1} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai1" value={formData.nilai1} onChange={onChange} required />
        
        <label>VAR MG:</label>
        <input type="text" name="varMg" value={formData.varMg} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent2" value={formData.percent2} onChange={onChange} required />
        
        <label>VAR ETK:</label>
        <input type="text" name="varEtk" value={formData.varEtk} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent3" value={formData.percent3} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai2" value={formData.nilai2} onChange={onChange} required />
        
        <label>VAR BB:</label>
        <input type="text" name="varBb" value={formData.varBb} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent4" value={formData.percent4} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai3" value={formData.nilai3} onChange={onChange} required />
        
        <label>VAR MB:</label>
        <input type="text" name="varMb" value={formData.varMb} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent5" value={formData.percent5} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai4" value={formData.nilai4} onChange={onChange} required />
        
        <label>VAR CAR:</label>
        <input type="text" name="varCar" value={formData.varCar} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent6" value={formData.percent6} onChange={onChange} required />
        
        <label>VAR SI:</label>
        <input type="text" name="varSi" value={formData.varSi} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent7" value={formData.percent7} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai5" value={formData.nilai5} onChange={onChange} required />
        
        <label>VAR SCRAP:</label>
        <input type="text" name="varScrap" value={formData.varScrap} onChange={onChange} required />
        
        <label>%:</label>
        <input type="text" name="percent8" value={formData.percent8} onChange={onChange} required />
        
        <label>NILAI:</label>
        <input type="text" name="nilai6" value={formData.nilai6} onChange={onChange} required />
        
        <div className="modal-buttons">
          <button type="submit" className="modal-submit-button">Submit</button>
          <button type="button" className="modal-close-button" onClick={onRequestClose}>Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default Addsopir;
