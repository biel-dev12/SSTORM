import { useState, useEffect } from "react";
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
import axios from "axios";
import AdmForm from "./AdmForm.jsx";
import { EMAIL_API } from "../../api/config.js";

function RenovCond({ modelo, onSend, setModeloSelecionado }) {
  const [propostas, setPropostas] = useState([]);
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("2025");
  const [condominios, setCondominios] = useState("");
  const [showAdmForm, setShowAdmForm] = useState(false);
  const [admEditando, setAdmEditando] = useState(null);

  // Carregar lista de administradoras
  const fetchAdms = async () => {
    try {
      const res = await axios.get(`${EMAIL_API}/administradoras`);
      setPropostas(res.data);
      return res.data; // retorna lista atualizada
    } catch (error) {
      console.error("Erro ao carregar administradoras:", error);
      toast.error("Não foi possível carregar administradoras.");
      return [];
    }
  };
  useEffect(() => {
    fetchAdms();
  }, []);

  const empresas = propostas.map((e) => ({
    label: `${e.Adm} - ${e.Nome.trim()}`,
    value: e.Adm,
  }));

  const handleEmpresaChange = (e) => {
    const adm = parseInt(e.target.value);
    const empresa = propostas.find((item) => item.Adm === adm);
    setEmpresaSelecionada(empresa);
  };

  const handleEnviar = () => {
    if (!empresaSelecionada) return toast.warning("Selecione uma administradora.");
    const destinatario = empresaSelecionada["E-mail"]?.trim();
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
      mes,
      ano,
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
        <select onChange={handleEmpresaChange} value={empresaSelecionada?.Adm || ""}>
          <option value="">Selecione uma administradora</option>
          {empresas.map((empresa, i) => (
            <option key={i} value={empresa.value}>
              {empresa.label}
            </option>
          ))}
        </select>
      </Box>

      <Box style={{ display: "flex", gap: "10px" }}>
        <Button type="button" onClick={() => { setShowAdmForm(true); setAdmEditando(null); }}>
          Adicionar
        </Button>
        {empresaSelecionada && (
          <Button type="button" onClick={() => { setShowAdmForm(true); setAdmEditando(empresaSelecionada); }}>
            Editar
          </Button>
        )}
      </Box>

      {showAdmForm && (
        <AdmForm
          adm={admEditando}
          onSave={async () => {
            setShowAdmForm(false);
            const novas = await fetchAdms();

            // 🔥 atualiza seleção imediatamente
            if (admEditando) {
              const atualizada = novas.find(p => p.Adm === admEditando.Adm);
              if (atualizada) setEmpresaSelecionada(atualizada);
            } else {
              // se for uma nova, seleciona ela automaticamente
              const ultima = novas[novas.length - 1];
              setEmpresaSelecionada(ultima);
            }

            setAdmEditando(null);
          }}
          onClose={() => {
            setShowAdmForm(false);
            setAdmEditando(null);
          }}
        />
      )}



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

      <Button type="button" onClick={handleEnviar}>Enviar E-mail</Button>
    </Form>
  );
}

export default RenovCond;
