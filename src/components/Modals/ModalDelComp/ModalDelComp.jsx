import { Modal } from "antd";
import { useState, useEffect } from "react";
import { ConfirmDel } from "./style";
import { toast } from "react-toastify";
import { deleteCompany } from "../../../api/companyService";

const ModalDelComp = ({ visible, onClose, companyData, exitCompany }) => {
  const [titleModal, setTitleModal] = useState("Excluir Empresa");
  const [compName, setCompName] = useState();

  const [password, setPassword] = useState({
    password: "",
  });

  const delPassw = "xablau";

  useEffect(() => {
    if (companyData) {
      setTitleModal(`Excluir Empresa - ${companyData.nm_comp_name}`);
      setCompName(companyData.nm_comp_name);
    }
  }, [companyData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const verifyPassw = async () => {
    setPassword({ password: "" });

    if (!password.password) {
      toast.warn("A senha não pode ser um campo vazio!", { autoClose: 900 });
      return;
    }

    if (password.password !== delPassw) {
      toast.error("Senha incorreta!", { autoClose: 900 });
      return;
    }

    const result = await deleteCompany(companyData.id_company);

    if (result) {
      exitCompany(null);
    }

    onClose();
  };

  return (
    <Modal
      title={titleModal}
      centered
      open={visible}
      onOk={verifyPassw}
      onCancel={onClose}
    >
      <ConfirmDel>
        <label htmlFor="password">
          Para excluir a empresa <b>"{compName}"</b>, digite a senha de
          exclusão:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          maxLength={8}
          size={8}
          value={password.password}
          onChange={handleChange}
        />
      </ConfirmDel>
    </Modal>
  );
};

export default ModalDelComp;
