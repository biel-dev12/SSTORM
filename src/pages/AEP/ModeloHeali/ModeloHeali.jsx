// src/pages/ModeloHeali.jsx
import { useState } from "react";
import { Container, FileInput, Button, ResultLink } from "./styles"
import { AEP_API } from "../../../api/config";


export default function ModeloHeali() {
  const [files, setFiles] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (files.length === 0) return alert("Selecione ao menos uma planilha");

    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    const response = await fetch(`${AEP_API}/modelo-heali`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      alert("Erro ao gerar as planilhas");
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  }

  return (
    <Container>
      <h1>Gerar Planilhas Modelo por Empresa</h1>
      <form onSubmit={handleSubmit}>
        <FileInput
          type="file"
          accept=".xlsx,.xls"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <br />
        <Button type="submit">Gerar Planilhas</Button>
      </form>
      {downloadUrl && (
        <ResultLink href={downloadUrl} download="planilhas_por_empresa.zip">
          Baixar Planilhas Geradas
        </ResultLink>
      )}
    </Container>
  );
}
