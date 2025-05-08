import { useState } from "react";
import {
  Container,
  TopBar,
  BackButton,
  Main,
  LeftContainer,
  RightContainer,
  TextArea,
  Label,
  InfoGroup,
  InfoItem,
  Orange,
  Input,
  CopyButton,
} from "./styles";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const parseText = (text) => {
  const result = {
    cnpj: "",
    cargo: "",
    solicitante: "",
    email: "",
  };

  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  // 1. Primeiro tenta identificar pelos rótulos
  for (let line of lines) {
    const lower = line.toLowerCase();

    if (!result.cnpj && lower.includes("cnpj")) {
      result.cnpj = line.split(":").pop().trim();
      continue;
    }

    if (!result.cargo && lower.includes("cargo")) {
      result.cargo = line.split(":").pop().trim();
      continue;
    }

    if (
      !result.solicitante &&
      (lower.includes("solicitante") ||
        lower.includes("nome do solicitante") ||
        lower.includes("nome"))
    ) {
      result.solicitante = line.split(":").pop().trim();
      continue;
    }

    if (!result.email && lower.includes("email")) {
      result.email = line.split(":").pop().trim();
      continue;
    }
  }

  // 2. Se ainda faltarem dados, assume a sequência fixa
  const camposFaltando = [];
  if (!result.cnpj) camposFaltando.push("cnpj");
  if (!result.cargo) camposFaltando.push("cargo");
  if (!result.solicitante) camposFaltando.push("solicitante");
  if (!result.email) camposFaltando.push("email");

  const usados = new Set([
    result.cnpj,
    result.cargo,
    result.solicitante,
    result.email,
  ]);

  const restantes = lines.filter((line) => !usados.has(line));

  camposFaltando.forEach((campo, index) => {
    if (restantes[index]) {
      result[campo] = restantes[index];
    }
  });

  return result;
};

const parseRiscos = (text) => {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const index = line.indexOf("[");
      return index > -1 ? line.slice(0, index).trim() : line;
    })
    .join("\n");
};

const parseExames = (text) => {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const indexRisco = line.indexOf("RISCO");
      const indexUn = line.indexOf("UN");

      const validIndexes = [indexRisco, indexUn].filter((i) => i !== -1);
      const index = validIndexes.length > 0 ? Math.min(...validIndexes) : -1;

      return index > -1 ? line.slice(0, index).trim() : line;
    })
    .join("\n");
};

const CompleTxt = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState("");
  const [riscosText, setRiscosText] = useState("");
  const [examesText, setExamesText] = useState("");
  const [origem, setOrigem] = useState("");
  const [faturamento, setFaturamento] = useState("");

  const info = parseText(inputText);
  const riscosFormatados = parseRiscos(riscosText);
  const examesFormatados = parseExames(examesText);

  const handleCopy = () => {
    const textoFormatado = [
      "*Empresa:*",
      "",
      `*CNPJ:* ${info.cnpj}`,
      "",
      `${(faturamento || "").toUpperCase()}`,
      "",
      `*Cargo:* ${info.cargo}`,
      "",
      "*Riscos:*",
      riscosFormatados,
      "",
      "*Exames:*",
      examesFormatados,
      "",
      `*E-mail:* ${info.email}`,
      "",
      `*Solicitante:* ${info.solicitante} - ${origem}`,
    ]
      .map(line => line.trimStart()) // remove qualquer espaço à esquerda
      .join("\n");

    navigator.clipboard
      .writeText(textoFormatado)
      .then(() => {
        toast.success("Texto copiado com sucesso!");
      })
      .catch(() => {
        toast.error("Falha ao copiar o texto.");
      });
  };

  return (
    <Container>
      <TopBar>
        <span>
          <strong>Gerar Certificados PGR/PCMSO:</strong>
        </span>
        <BackButton onClick={() => navigate("/")}>
          <MdHome id="home" />
        </BackButton>
      </TopBar>

      <Main>
        <LeftContainer>
          <div>
            <Label>
              <strong>Origem do complemento:</strong>
            </Label>
            <Input
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              placeholder="Ex: Octa/Agendamento"
            />
          </div>

          <div>
            <Label>
              <strong>Tipo de faturamento:</strong>
            </Label>
            <Input
              value={faturamento}
              onChange={(e) => setFaturamento(e.target.value)}
              placeholder="Ex: Cortesia, Carência, Não tem LTCAT..."
            />
          </div>
          <div>
            <Label>
              <strong>Colar dados:</strong>
            </Label>
            <TextArea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Cole aqui os dados do solicitante"
            />
          </div>

          <div>
            <Label>
              <strong>Riscos:</strong>
            </Label>
            <TextArea
              value={riscosText}
              onChange={(e) => setRiscosText(e.target.value)}
              placeholder="Cole aqui os riscos do cargo"
            />
          </div>

          <div>
            <Label>
              <strong>Exames:</strong>
            </Label>
            <TextArea
              value={examesText}
              onChange={(e) => setExamesText(e.target.value)}
              placeholder="Cole aqui os exames do cargo"
            />
          </div>
        </LeftContainer>

        <RightContainer>
          <Label>
            <strong>Informações Formatadas:</strong>
          </Label>
          <InfoGroup>
            <InfoItem>
              <Orange>Empresa:</Orange>
            </InfoItem>
            <InfoItem>
              <Orange>CNPJ:</Orange> {info.cnpj}
            </InfoItem>
            <InfoItem>
              <Orange>Cargo:</Orange> {info.cargo}
            </InfoItem>
            <InfoItem>
              <Orange>{faturamento.toUpperCase()}</Orange>
            </InfoItem>
            <InfoItem>
              <Orange>Riscos:</Orange>
              <pre style={{ margin: 0 }}>{riscosFormatados}</pre>
            </InfoItem>
            <InfoItem>
              <Orange>Exames:</Orange>
              <pre style={{ margin: 0 }}>{examesFormatados}</pre>
            </InfoItem>
            <InfoItem>
              <Orange>E-mail:</Orange> {info.email}
            </InfoItem>
            <InfoItem>
              <Orange>Solicitante:</Orange> {info.solicitante} -{" "}
              <span>{origem}</span>
            </InfoItem>
          </InfoGroup>
          <CopyButton onClick={handleCopy}>Copiar texto formatado</CopyButton>
        </RightContainer>
      </Main>
    </Container>
  );
};

export default CompleTxt;
