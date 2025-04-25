import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DOC_API } from "../../../api/config";
import {
  Container,
  TopBar,
  BackButton,
  StyledForm,
  FormGroup,
  SubmitButton,
  TitleForm,
} from "../CreateLtcat/styles";
import { MdHome } from "react-icons/md";
import { toast } from "react-toastify";

const ImportLtcat = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.warn("Selecione um arquivo DOCX primeiro.");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch(`${DOC_API}/parse-ltcat`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao processar documento.");
      const data = await response.json();

      navigate("/create-ltcat", { state: { empresa: data } });
    } catch (error) {
      console.error("Erro no upload:", error);
      toast.error("Falha ao importar o documento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TopBar>
        <span>
          <strong>Importar LTCAT Anterior</strong>
        </span>
        <BackButton onClick={() => navigate("/")}>
          <MdHome />
        </BackButton>
      </TopBar>

      <StyledForm onSubmit={handleUpload}>
        <TitleForm>Selecione o arquivo do LTCAT antigo</TitleForm>
        <FormGroup size={1}>
          <input type="file" accept=".docx" onChange={handleFileChange} required />
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Processando..." : "Importar e Editar"}
        </SubmitButton>
      </StyledForm>
    </Container>
  );
};

export default ImportLtcat;
