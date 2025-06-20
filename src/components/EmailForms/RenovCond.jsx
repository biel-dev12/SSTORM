import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Box,
  Header
} from "../../pages/SendEmail/SendEmail.js";
import { MdOutlineArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import propostas from "./adms_proposta.json";

function RenovCond({ modelo, onSend, setModeloSelecionado }) {
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("2025");
  const [condominios, setCondominios] = useState("");

  const empresas = propostas.map((e) => ({
    label: `${e.Adm} ${e.Nome.trim()}`,
    value: e.Adm,
  }));

  const handleEmpresaChange = (e) => {
    const adm = parseInt(e.target.value);
    const empresa = propostas.find((item) => item.Adm === adm);
    setEmpresaSelecionada(empresa);
  };

  const handleEnviar = () => {
    if (!empresaSelecionada) return toast.warning("Selecione uma administradora.");
    const destinatario = empresaSelecionada["E-mail"]?.trim()
    const proposta = empresaSelecionada["Proposta Comercial"];
    const nomeEmpresa = empresaSelecionada.Nome?.trim();

    if (!destinatario) return toast.error("Empresa não possui e-mail.");
    if (!proposta) return toast.error("Empresa não possui proposta.");
    if (!mes) return toast.error("Insira o mês de renovação!.");

    const assunto = `INFORMATIVO – RENOVAÇÃO DOS PROGRAMAS PGR/PCMSO | ${mes}/${ano} - ${nomeEmpresa}`;

    const payload = {
      destinatarios: [destinatario],
      copia: ["comercial@doctorspraiagrande.com.br"],
      assunto,
      modelo: modelo.nome,
      departamento: modelo.departamento,
      mes: mes,
      ano: ano,
      empresa: nomeEmpresa,
      proposta,
      condominios,
    };

    onSend(payload);
  };

  return (
    <Form>
      <Header>
        <MdOutlineArrowBack
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setModeloSelecionado(null)}
        />
        <h2>Enviar E-mail - Renovação de Programas de Condomínios</h2>
      </Header>

      <Box>
        <Label>Administradora:</Label>
        <select onChange={handleEmpresaChange} defaultValue="">
          <option value="">Selecione uma administradora</option>
          {empresas.map((empresa, i) => (
            <option key={i} value={empresa.value}>
              {empresa.label}
            </option>
          ))}
        </select>
      </Box>

      <Box>
        <Label>Mês:</Label>
        <Input
          type="text"
          value={mes}
          onChange={(e) => setMes(e.target.value.toUpperCase())}
          placeholder="Ex: JUNHO"
        />
      </Box>

      <Box>
        <Label>Ano:</Label>
        <Input
          type="text"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          placeholder="Ex: 2025"
        />
      </Box>

      <Box>
        <Label>Lista de Condomínios (um por linha):</Label>
        <Input
          as="textarea"
          rows={5}
          value={condominios}
          onChange={(e) => setCondominios(e.target.value)}
        />
      </Box>

      <Button onClick={handleEnviar}>Enviar E-mail</Button>
    </Form>
  );
}

export default RenovCond;
