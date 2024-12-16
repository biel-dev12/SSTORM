import { Modal } from "antd";
import { useState, useEffect } from "react";
import { ConfirmDel } from './style'

const ModalDelComp = ({ visible, onClose, companyData }) => {
  const [titleModal, setTitleModal] = useState("Excluir Empresa");
  const [compName, setCompName] = useState()

  useEffect(() => {
    if (companyData) {
      setTitleModal(`Excluir Empresa - ${companyData.nm_comp_name}`);
      setCompName(companyData.nm_comp_name)
    }
  }, [companyData]);

  const verifyPassw = "" //construir funcção

  return (
    <Modal
      title={titleModal}
      centered
      open={visible}
      onOk={verifyPassw}
      onCancel={onClose}
    >
      <ConfirmDel>
        <label htmlFor="delPassw">
          Para excluir a empresa <b>"{compName}"</b>, digite a
          senha de exclusão:
        </label>
        <input
          type="password"
          name="delPassw"
          id="delPassw"
          maxLength={8}
          size={8}
        />
      </ConfirmDel>
    </Modal>
  );
};

export default ModalDelComp;
