import { useState } from "react";
import { Modal } from "antd";
import SegmentList from "../../Responses/SegmentList";
import { Form, InputBox, Label, Input } from "./style";
import { API_URL, api } from "../../../api/config";
import { useAuth } from "../../AuthContext";

const ModalAddComp = ({ visible, onClose }) => {
  const { user } = useAuth()
  console.log("Usuário no contexto:", user);

  const [formData, setFormData] = useState({
    compCond: "E",
    fatntasyName: "",
    cnpj: "",
    segment: "",
    monthValidity: "01",
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = { ...formData, userId: user?.id_user }
    alert(`compCond: ${formData.compCond}
           name: ${formData.fatntasyName}
           cnpj: ${formData.cnpj}
           segment: ${formData.segment}
           month: ${formData.monthValidity}
           user: ${user?.id_user}; `)
    // try {
    //   const payload = { ...formData, userId: user?.id_user }

    //   const response = await api.post(`${API_URL}/companies`, payload);
    //   if (response.status === 201) {
    //     toast.success("Empresa criada com sucesso!");
    //     onClose();
    //   } else {
    //     throw new Error("Erro ao criar empresa");
    //   }
    // } catch (error) {
    //   toast.error("Erro ao criar empresa. Verifique os dados e tente novamente.");
    // }
  };

  return (
    <Modal
      title="Incluir Empresa"
      centered
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
    >
      <Form>
        <InputBox>
          <Label htmlFor="compCond">Empresa ou Condomínio?</Label>
          <select name="compCond" id="compCond" value={formData.compCond} onChange={handleChange}>
            <option value="E">Empresa</option>
            <option value="C">Condomínio</option>
          </select>
        </InputBox>
        <InputBox>
          <Label htmlFor="fantasyName">Razão Social:</Label>
          <Input
            type="text"
            id="fantasyName"
            name="fantasyName"
            value={formData.fantasyName}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="cnpj">CNPJ:</Label>
          <Input
            type="text"
            id="cnpj"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="segment">Segmento:</Label>
          <SegmentList
            value={formData.segment}
            onChange={(value) => setFormData((prev) => ({ ...prev, segment: value }))}
          />
        </InputBox>
        <InputBox>
          <Label htmlFor="monthValidity">Mês de vigência (PGR):</Label>
          <select
            name="monthValidity"
            id="monthValidity"
            value={formData.monthValidity}
            onChange={handleChange}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={(i + 1).toString().padStart(2, "0")}>
                {new Date(0, i).toLocaleString("pt-BR", { month: "short" })}
              </option>
            ))}
          </select>
        </InputBox>
      </Form>
    </Modal>
  );
};

export default ModalAddComp;