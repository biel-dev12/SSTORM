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
    cd_id_type_service: "",
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
    id_pgr_pcmso: ""
  });

  useEffect(() => {
    if (visible && companyId) {
      getPgrByCompany(companyId).then((data) => {
        console.log("Dados retornados da API:", data); // Verificando a resposta
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            ...data[0], // Acessa o primeiro item da array
            cd_id_company_doc: companyId, // Empresa
            id_pgr_pcmso: data[0].id_pgr_pcmso, // ID do PGR
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            cd_id_company_doc: companyId, // Garante que a empresa esteja associada
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

  const formatDateForInput = (isoDate) => {
    if (!isoDate) return "";
    return isoDate.split("T")[0]; // Pega apenas a parte "YYYY-MM-DD"
  };

  // Envia os dados atualizados
  const handleSubmit = async () => {
    const updatedData = {
      ...formData,
      dt_release: formData.dt_release ? formatDateForInput(formData.dt_release) : null, 
      dt_contele: formData.dt_contele ? formatDateForInput(formData.dt_contele) : null, 
      dt_basic_doc: formData.dt_basic_doc ? formatDateForInput(formData.dt_basic_doc) : null,
      dt_inspection: formData.dt_inspection ? formatDateForInput(formData.dt_inspection) : null, 
      dt_definitive_doc: formData.dt_definitive_doc ? formatDateForInput(formData.dt_definitive_doc) : null,
      dt_submission_doc: formData.dt_submission_doc ? formatDateForInput(formData.dt_submission_doc) : null,
    };

    console.log(updatedData)

    try {
      if (!updatedData.id_pgr_pcmso) {
        toast.error("ID do PGR não encontrado!");
        return;
      }
  
      await updatePgr(updatedData.id_pgr_pcmso, updatedData.cd_id_company_doc, updatedData);
  
      toast.success("PGR atualizado com sucesso!", {autoClose: 800});
      updatePgrData(updatedData, updatedData.cd_id_company_doc);
      onClose();
    } catch (error) {
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
            <option value="">Selecione um tipo</option>
            <option value="In">In</option>
            <option value="Tele">Tele</option>
          </select>
        </InputBox>

        <InputBox>
          <Label htmlFor="dt_release">Liberação Comercial:</Label>
          <Input
            type="date"
            id="dt_release"
            value={formatDateForInput(formData.dt_release) || ""}
            onChange={(e) => handleChange("dt_release", e.target.value)}
          />
        </InputBox>

        <InputBox>
          <Label htmlFor="cd_id_type_service">Tipo de Serviço:</Label>
          <TypeServiceList
            value={formData.cd_id_type_service}
            onChange={(value) => handleChange("cd_id_type_service", value)}
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
              value={formatDateForInput(formData[dtField]) || ""}
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