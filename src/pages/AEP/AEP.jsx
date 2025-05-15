// src/App.jsx
import { AEP_API, API_URL } from "../../api/config";
import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 2rem;
  font-family: sans-serif;
`;

const FileInput = styled.input`
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ResultLink = styled.a`
  display: block;
  margin-top: 1rem;
`;

export default function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  async function handleSubmit(e) {
  e.preventDefault();
  if (!file) return alert("Selecione um arquivo");

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${AEP_API}/upload`, {
    method: "POST",
    body: formData,
  });

  console.log("Status do response:", response.status);

  if (!response.ok) {
    alert("Erro no upload");
    return;
  }

  const blob = await response.blob();
  console.log("Blob recebido:", blob);

  const url = URL.createObjectURL(blob);
  setDownloadUrl(url);
}


  return (
    <Container>
      <h1>Importar Excel e Extrair Dados</h1>
      <form onSubmit={handleSubmit}>
        <FileInput
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <Button type="submit">Enviar</Button>
      </form>
      {downloadUrl && (
        <ResultLink href={downloadUrl} download="dados_extraidos.xlsx">
          Baixar Planilha Processada
        </ResultLink>
      )}
    </Container>
  );
}
