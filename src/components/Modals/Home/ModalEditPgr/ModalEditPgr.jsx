import { useState, useEffect } from "react";
import { Modal } from "antd";
import { Form, InputBox, Label, Input } from "./style";
import { toast } from "react-toastify";
import { updatePgr, getPgrByCompany } from "../../../../api/pgrService"; 
import TypeServiceList from "../../../Responses/TypeServiceList";
import TechList from "../../../Responses/TechList";

const ModalEditPgr = ({ visible, onClose, companyId, updatePgrData }) => {
  const [formData, setFormData] = useState({
    ds_type_inspection: "",
    dt_release: "",
    ds_type_service: "",
    dt_contele: "",
    cd_id_contele_tec: "",
    dt_basic_doc: "",
    cd_id_bas_doc_tec: "",
    dt_inspection: "",
    cd_id_insp_tec: "",
    dt_definitive_doc: "",
    cd_id_def_doc_tec: "",
    dt_submission_doc: "",
    cd_id_sub_tec: "",
    ds_obs: "",
    cd_id_company_doc: companyId || "",
  });

  useEffect(() => {
    if (visible && companyId) {
      getPgrByCompany(companyId).then((data) => {
        if (data) {
          setFormData((prev) => ({
            ...prev,
            ...data, // Preenche o formData com os dados recebidos
            cd_id_company_doc: companyId, // Garante que a empresa correta está sendo editada
          }));
        }
      }).catch((error) => {
        console.error("Erro ao buscar dados do PGR:", error);
        toast.error("Erro ao carregar os dados do PGR.");
      });
    }
  }, [visible, companyId]);

  // Atualiza os valores do formulário
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Envia os dados atualizados
  const handleSubmit = async () => {
    try {
      if (!formData.cd_id_company_doc) {
        toast.error("Empresa não identificada!");
        return;
      }

      await updatePgr(formData.cd_id_company_doc, formData);

      toast.success("PGR atualizado com sucesso!");
      updatePgrData(formData); // Atualiza os dados no card
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar PGR:", error);
      toast.error("Erro ao atualizar PGR. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Modal
      title="Editar Informações da Empresa"
      centered
      open={visible}
      onOk={handleSubmit}
      onCancel={onClose}
      okText="Salvar"
      cancelText="Cancelar"
    >
      <Form>
        <InputBox>
          <Label htmlFor="type_inspection">Tipo de Inspeção:</Label>
          <select
            name="ds_type_inspection"
            id="type_inspection"
            value={formData.ds_type_inspection}
            onChange={(e) => handleChange("ds_type_inspection", e.target.value)}
          >
            <option value="" disabled>Selecione um tipo</option>
            <option value="In">In</option>
            <option value="Tele">Tele</option>
          </select>
        </InputBox>

        <InputBox>
          <Label htmlFor="dt_release">Liberação Comercial:</Label>
          <Input
            type="date"
            id="dt_release"
            value={formData.dt_release || ""}
            onChange={(e) => handleChange("dt_release", e.target.value)}
          />
        </InputBox>

        <InputBox>
          <Label htmlFor="ds_type_service">Tipo de Serviço:</Label>
          <TypeServiceList
            value={formData.ds_type_service}
            onChange={(value) => handleChange("ds_type_service", value)}
          />
        </InputBox>

        {[  
          { label: "Contele Alimentado", dtField: "dt_contele", tecField: "cd_id_contele_tec" },
          { label: "SOC+DOC Básico", dtField: "dt_basic_doc", tecField: "cd_id_bas_doc_tec" },
          { label: "Inspeção Técnica", dtField: "dt_inspection", tecField: "cd_id_insp_tec" },
          { label: "SOC+DOC Definitivo", dtField: "dt_definitive_doc", tecField: "cd_id_def_doc_tec" },
          { label: "Assinatura e Envio", dtField: "dt_submission_doc", tecField: "cd_id_sub_tec" },
        ].map(({ label, dtField, tecField }) => (
          <InputBox key={dtField}>
            <Label>{label}:</Label>
            <Input
              type="date"
              value={formData[dtField] || ""}
              onChange={(e) => handleChange(dtField, e.target.value)}
            />
            <TechList
              value={formData[tecField]}
              onChange={(value) => handleChange(tecField, value)}
            />
          </InputBox>
        ))}

        <InputBox>
          <Label htmlFor="ds_obs">Observações:</Label>
          <Input
            type="text"
            id="ds_obs"
            value={formData.ds_obs || ""}
            onChange={(e) => handleChange("ds_obs", e.target.value)}
          />
        </InputBox>
      </Form>
    </Modal>
  );
};

export default ModalEditPgr;