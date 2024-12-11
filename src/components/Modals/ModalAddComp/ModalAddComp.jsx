import { useState } from "react";
import { Modal } from "antd";
import SegmentList from "../../Responses/SegmentList";
import { Form, InputBox, Label, Input } from "./style";
import { API_URL, api } from "../../../api/config";
import { useAuth } from "../../AuthContext";
import { toast } from "react-toastify";

const ModalAddComp = ({ visible, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    compCond: "E",
    fantasyName: "",
    cnpj: "",
    segment: "",
    monthValidity: "01",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCNPJChange = (e) => {
    let cnpj = e.target.value.replace(/\D/g, "").slice(0, 14);
    cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2");
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2");
    cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2");
    setFormData((prev) => ({ ...prev, cnpj }));
  };

  const handleSubmit = async () => {
    if (!user?.id_user) {
      toast.error("Usuário não autenticado.");
      return;
    }

    alert(`Dados enviados:
      CompCond: ${formData.compCond}
      Nome: ${formData.fantasyName}
      CNPJ: ${formData.cnpj}
      Segmento: ${formData.segment}
      Mês de Vigência: ${formData.monthValidity}
      Usuário: ${user?.id_user}`
    );

    // try {
    //   const payload = { ...formData, userId: user?.id_user };
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
          <select
            name="compCond"
            id="compCond"
            value={formData.compCond}
            onChange={handleChange}
          >
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
            onChange={handleCNPJChange}
            max={14}
          />
        </InputBox>

        <InputBox>
          <Label htmlFor="segment">Segmento:</Label>
          <SegmentList
            value={formData.segment}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, segment: value }))
            }
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
