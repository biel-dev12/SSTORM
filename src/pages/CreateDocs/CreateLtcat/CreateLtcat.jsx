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
  TitleForm,
  AddBtn,
  Fieldset,
  FieldGroupWrapper,
  LegendForm,
} from "./styles";
import { MdHome } from "react-icons/md";
import SetorField from "../../../components/CompsCreateDocs/SetorField.jsx";
import CargoField from "../../../components/CompsCreateDocs/CargoField.jsx";

const CreateLtcat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const empresa = location.state?.empresa;
  const [setores, setSetores] = useState([
    { nome: "", descricao: "", cargos: [] },
  ]);

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

    const setoresIncompletos = setores.some(
      (s) => !s.nome.trim() || !s.descricao.trim()
    );
    if (setoresIncompletos) {
      alert("Preencha todos os campos dos setores antes de gerar o documento.");
      return;
    }

    try {
      const response = await api.post(
        `${DOC_API}/doc-ltcat`,
        {
          ...form,
          setores: setoresFormatados,
        },
        {
          responseType: "blob",
        }
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
    } catch (error) {
      console.error("Erro ao gerar documento:", error);
    }
  };

  const handleSetorChange = (index, field, value) => {
    const novosSetores = [...setores];
    novosSetores[index][field] = value;
    setSetores(novosSetores);
  };

  const handleCargoChange = (setorIndex, cargoIndex, field, value) => {
    const novosSetores = [...setores];
    novosSetores[setorIndex].cargos[cargoIndex][field] = value;
    setSetores(novosSetores);
  };

  const removeSetor = (index) => {
    const novosSetores = setores.filter((_, i) => i !== index);
    setSetores(novosSetores);
  };

  const removeCargo = (setorIndex, cargoIndex) => {
    const novosSetores = [...setores];
    novosSetores[setorIndex].cargos = novosSetores[setorIndex].cargos.filter(
      (_, i) => i !== cargoIndex
    );
    setSetores(novosSetores);
  };

  const addCargo = (index) => {
    const novosSetores = [...setores];
    if (!novosSetores[index].cargos) {
      novosSetores[index].cargos = [];
    }
    novosSetores[index].cargos.push({ titulo: "", descricao: "" });
    setSetores(novosSetores);
  };

  const setoresFormatados = setores.map((s) => ({
    nome: `Setor ${s.nome.trim()}`,
    descricao: s.descricao.trim(),
  }));

  return (
    <Container>
      <TopBar>
        <span>
          <strong>Empresa selecionada:</strong> {empresa?.nm_comp_name || "N/A"}{" "}
          | <strong>Mês de Vigência: </strong> {empresa.ds_month_validity}
        </span>
        <BackButton onClick={() => navigate("/")}>
          {" "}
          <MdHome id="home" />
        </BackButton>
      </TopBar>

      <StyledForm onSubmit={handleSubmit}>
        <TitleForm>Informações Básicas</TitleForm>
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

        <Fieldset>
          <LegendForm>Setores</LegendForm>
          {setores.map((setor, index) => (
            <FieldGroupWrapper key={index}>
              <SetorField
                setor={setor}
                index={index}
                onChange={handleSetorChange}
                onRemove={removeSetor}
              />

              <Fieldset>
                <LegendForm>Cargos</LegendForm>
                {setor.cargos.map((cargo, i) => (
                  <CargoField
                    key={i}
                    cargo={cargo}
                    onChange={(field, value) =>
                      handleCargoChange(index, i, field, value)
                    }
                    onRemove={() => removeCargo(index, i)}
                  />
                ))}
              </Fieldset>

              <AddBtn
                type="button"
                className="cargo"
                onClick={() => addCargo(index)}
              >
                Adicionar Cargo
              </AddBtn>
            </FieldGroupWrapper>
          ))}
        </Fieldset>

        <AddBtn
          type="button"
          onClick={() =>
            setSetores([...setores, { nome: "", descricao: "", cargos: [] }])
          }
        >
          Adicionar Setor
        </AddBtn>

        <SubmitButton type="submit">Gerar Documento</SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default CreateLtcat;
