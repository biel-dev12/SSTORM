import { useState, useEffect } from "react";
import { Modal } from "antd";
import SegmentList from "../../../Responses/SegmentList";
import CityList from "../../../Responses/CityList";
import { Form, InputBox, Label, Input } from "./style";
import { useAuth } from "../../../AuthContext";
import { toast } from "react-toastify";
import { updateCompany } from "../../../../api/companyService";

const ModalEditComp = ({ visible, onClose, companyData, exitCompany }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    compCond: "E",
    fantasyName: "",
    city: "",
    segment: "",
    monthValidity: "01",
  });

  useEffect(() => {
    if (companyData && companyData.id_company) {
      setFormData({
        compCond: companyData.cd_comp_or_cond === 1 ? "E" : "C",
        fantasyName: companyData.nm_comp_name || "",
        cnpj: companyData.cd_cnpj || "",
        segment: companyData.cd_id_segment?.toString() || "",
        monthValidity: companyData.ds_month_validity || "01",
      });
    }
  }, [companyData]);

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
    setFormData({
      compCond: "E",
      fantasyName: "",
      cnpj: "",
      segment: "",
      city: "",
      monthValidity: "01",
    });

    if (!user?.id_user) {
      toast.error("Usuário não autenticado.");
      return;
    }

    if (!formData.segment || !formData.fantasyName || !formData.cnpj) {
      toast.warn("Preencha todos os campos!", { autoClose: 800 });
      return;
    } else if (formData.cnpj.length < 18) {
      toast.warn("Preencha o CNPJ corretamente!", { autoClose: 800 });
      return;
    }

    const updatedData = { ...formData, userId: user?.id_user };
    await updateCompany(companyData.id_company, updatedData);

    exitCompany(null);
    onClose();
  };

  return (
    <Modal
      title="Editar Empresa"
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
            maxLength={18}
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
          <Label htmlFor="city">Cidade:</Label>
          <CityList
            value={formData.city}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, city: value }))
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

export default ModalEditComp;
