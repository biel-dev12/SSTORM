import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  TitleForm,
  ToggleModeButton,
  TextArea,
  LoaderContainer,
  LoaderSpinner,
  LoaderText,
} from "./styles.js";
import { MdHome } from "react-icons/md";
import { toast } from "react-toastify";

const Cert18B
 = () => {
  const navigate = useNavigate();
  const [modoLote, setModoLote] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    empresa: "",
    data: "",
    inicio: "",
    fim: "",
    nome: "",
    endereco: "",
    modelo: "formacao18-b",
  });

  const [listaNomes, setListaNomes] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (modoLote) {
      const nomes = listaNomes
        .split("\n")
        .map((nome) => nome.trim())
        .filter((n) => n.length > 0);

      if (nomes.length === 0) {
        toast.warning("Cole ao menos um nome válido.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.post(
          `${DOC_API}/doc-certificado/lote`,
          {
            nomes: nomes,
            dados: {
              empresa: form.empresa,
              data: form.data,
              inicio: form.inicio,
              fim: form.fim,
              endereco: form.endereco,
              modelo: form.modelo
            },
          },
          { responseType: "blob" }
        );

        const fileName = response.headers["x-filename"] || "certificados.zip";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast.success("Certificados gerados com sucesso!");
      } catch (error) {
        console.error("Erro ao gerar lote:", error);
        toast.error("Erro ao gerar os certificados.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await api.post(
          `${DOC_API}/doc-certificado`,
          { ...form },
          { responseType: "blob" }
        );

        const fileName =
          response.headers["x-filename"] || "documento_gerado.docx";
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast.success("Certificado gerado com sucesso!");
      } catch (error) {
        console.error("Erro ao gerar documento:", error);
        toast.error("Erro ao gerar o certificado.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <TopBar>
        <span>
          <strong>Gerar Certificados NR-18 - Basico de Segurança do Trabalho:</strong>
        </span>
        <BackButton onClick={() => navigate("/")}>
          <MdHome id="home" />
        </BackButton>
      </TopBar>

      <StyledForm onSubmit={handleSubmit}>
        <ToggleModeButton type="button" onClick={() => setModoLote(!modoLote)}>
          {modoLote
            ? "Alternar para modo individual"
            : "Alternar para modo em lote"}
        </ToggleModeButton>

        <FormGroup size={1}>
          <label>Tipo de Certificado:</label>
          <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
            <label>
              <input
                type="radio"
                name="modelo"
                value="formacao18-b"
                checked={form.modelo === "formacao18-b"}
                onChange={handleChange}
              />
              Funcionários
            </label>
            <label>
              <input
                type="radio"
                name="modelo"
                value="empresa18-b"
                checked={form.modelo === "empresa18-b"}
                onChange={handleChange}
              />
              Empresas
            </label>
          </div>
        </FormGroup>

        <TitleForm>Informações Básicas</TitleForm>

        <FormRow>
          <FormGroup size={1}>
            <label>Empresa:</label>
            <input
              type="text"
              name="empresa"
              value={form.empresa}
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
        </FormRow>

        <FormRow>
          <FormGroup size={0.1}>
            <label>Data:</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup size={0.1}>
            <label>Início:</label>
            <input
              type="time"
              name="inicio"
              value={form.inicio}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup size={0.38}>
            <label>Término:</label>
            <input
              type="time"
              name="fim"
              value={form.fim}
              onChange={handleChange}
              required
            />
          </FormGroup>
        </FormRow>

        {!modoLote && (
          <FormGroup size={0.9}>
            <label>Nome do Treinando:</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </FormGroup>
        )}

        {modoLote && (
          <FormGroup size={1}>
            <label>Colar lista de nomes (um por linha):</label>
            <TextArea
              rows={10}
              value={listaNomes}
              onChange={(e) => setListaNomes(e.target.value)}
              placeholder={`Ex:\nJoão Silva\nMaria Oliveira\nCarlos de Souza`}
            />
          </FormGroup>
        )}

        {isLoading && (
          <LoaderContainer>
            <LoaderSpinner />
            <LoaderText>Processando certificados...</LoaderText>
          </LoaderContainer>
        )}

        <SubmitButton type="submit" disabled={isLoading}>
          {modoLote ? "Gerar ZIP com certificados" : "Gerar Certificado"}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default Cert18B
;
