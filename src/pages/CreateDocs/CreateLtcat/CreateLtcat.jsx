import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../api/config.js";
import { DOC_API } from "../../../api/config.js";
import {
  Container,
  TopBar,
  BackButton,
  StyledForm,
  FormGroup,
  FormRow,
  SubmitButton,
} from "./styles";
import { MdHome } from "react-icons/md";

const CreateLtcat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const empresa = location.state?.empresa;
  console.log(empresa);

  const [form, setForm] = useState({
    razao_social: empresa?.nm_comp_name || "",
    cnpj: empresa?.cd_cnpj || "",
    endereco: "",
    data_avaliacao: "",
    acompanhante: "",
    cnae: "",
    gr: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`${DOC_API}/doc-ltcat`, form, {
        responseType: "blob",
      });

      const fileName =
        response.headers["x-filename"] || "documento_gerado.docx";

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Erro ao gerar documento:", error);
    }
  };

  return (
    <Container>
      <TopBar>
        <span>
          <strong>Empresa selecionada:</strong> {empresa?.nm_comp_name || "N/A"}{" "}
          e {empresa.ds_month_validity}
        </span>
        <BackButton onClick={() => navigate("/")}>
          {" "}
          <MdHome id="home" />
        </BackButton>
      </TopBar>

      <StyledForm onSubmit={handleSubmit}>
        <FormGroup size={1}>
          <label>Razão Social:</label>
          <input
            type="text"
            name="razao_social"
            value={form.razao_social}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup size={1}>
          <label>Endereço:</label>
          <input
            type="text"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormRow>
          <FormGroup size={0.4}>
            <label>CNPJ:</label>
            <input
              type="text"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup size={0.4}>
            <label>CNAE:</label>
            <input
              type="text"
              name="cnae"
              value={form.cnae}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup size={0.2}>
            <label>Grau de Risco:</label>
            <input
              type="number"
              name="gr"
              value={form.gr}
              onChange={handleChange}
              min={1}
              max={4}
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup size={0.1}>
            <label>Data da Avaliação:</label>
            <input
              type="date"
              name="data_avaliacao"
              value={form.data_avaliacao}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup size={0.9}>
            <label>Acompanhante:</label>
            <input
              type="text"
              name="acompanhante"
              value={form.acompanhante}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <SubmitButton type="submit">Gerar Documento</SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default CreateLtcat;
