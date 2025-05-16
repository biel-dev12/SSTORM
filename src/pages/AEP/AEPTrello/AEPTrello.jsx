// src/App.jsx
import { AEP_API } from "../../../api/config";
import { useState } from "react";
import { Container, FileInput, Button, ResultLink } from "./styles"


export default function AEPTrello() {
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
      <h1>Importar Excel Trello e Extrair Dados</h1>
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
