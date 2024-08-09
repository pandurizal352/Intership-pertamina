import React from 'react';
import Modal from 'react-modal';

const AddPetugas = ({ isOpen, onRequestClose, formData, onChange, onSubmit }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Tambah Data Ekspor Normal Nodle</h2>
      <form onSubmit={onSubmit}>
        <label>
          REGU:
          <input type="text" name="regu" value={formData.regu} onChange={onChange} />
        </label>
        <label>
          LINE:
          <input type="text" name="line" value={formData.line} onChange={onChange} />
        </label>
        <label>
          SACHET:
          <input type="text" name="sachet" value={formData.sachet} onChange={onChange} />
        </label>
        <label>
          VAR TPG:
          <input type="text" name="varTepung" value={formData.varTepung} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent1" value={formData.percent1} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai1" value={formData.nilai1} onChange={onChange} />
        </label>
        <label>
          VAR MG:
          <input type="text" name="varMg" value={formData.varMg} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent2" value={formData.percent2} onChange={onChange} />
        </label>
        <label>
          VAR ETK:
          <input type="text" name="varEtka" value={formData.varEtka} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent3" value={formData.percent3} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai2" value={formData.nilai2} onChange={onChange} />
        </label>
        <label>
          VAR BB:
          <input type="text" name="varBumbu" value={formData.varBumbu} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent4" value={formData.percent4} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai3" value={formData.nilai3} onChange={onChange} />
        </label>
        <label>
          VAR MB:
          <input type="text" name="varMinyakBumbu" value={formData.varMinyakBumbu} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent5" value={formData.percent5} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai4" value={formData.nilai4} onChange={onChange} />
        </label>
        <label>
          VAR CAR:
          <input type="text" name="varKarton" value={formData.varKarton} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent6" value={formData.percent6} onChange={onChange} />
        </label>
        <label>
          VAR SI:
          <input type="text" name="varSolidInggridien" value={formData.varSolidInggridien} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent7" value={formData.percent7} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai5" value={formData.nilai5} onChange={onChange} />
        </label>
        <label>
          VAR SCRAP:
          <input type="text" name="varScrap" value={formData.varScrap} onChange={onChange} />
        </label>
        <label>
          %:
          <input type="text" name="percent8" value={formData.percent8} onChange={onChange} />
        </label>
        <label>
          NILAI:
          <input type="text" name="nilai6" value={formData.nilai6} onChange={onChange} />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onRequestClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default AddPetugas;
