import axios from "axios";
import { useState } from "react";
import { Container } from "./SendEmail.js";
import EmailTemplates from "../../components/EmailTemplates/EmailTemplates.jsx";
import InformeTecnico from "../../components/EmailForms/InformeTecnico.jsx";
import TentativaContato from "../../components/EmailForms/TentativaContato.jsx";
import EmpresaNaoAtende from "../../components/EmailForms/EmpresaNaoAtende.jsx";
import { EMAIL_API } from "../../api/config.js";
import { toast } from "react-toastify";

function SendEmail() {
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const enviarEmail = async (email) => {
    try {
      await axios.post(
        `${EMAIL_API}/enviar-email`,
        { ...email }, // Garante que o objeto seja serializado corretamente
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      toast.success("E-mail enviado com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar o e-mail.");
      console.error(
        "Erro:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const renderizarFormulario = () => {
    if (!modeloSelecionado) return null;

    switch (modeloSelecionado.nome) {
      case "informe_tecnico":
        return (
          <InformeTecnico
            modelo={modeloSelecionado}
            onSend={enviarEmail}
            setModeloSelecionado={setModeloSelecionado}
          />
        );
      case "tentativa_contato":
        return (
          <TentativaContato
            modelo={modeloSelecionado}
            onSend={enviarEmail}
            setModeloSelecionado={setModeloSelecionado}
          />
        );
      case "empresa_nao_atende":
        return (
          <EmpresaNaoAtende
            modelo={modeloSelecionado}
            onSend={enviarEmail}
            setModeloSelecionado={setModeloSelecionado}
          />
        );
      default:
        return <p>{modeloSelecionado.nome}</p>;
    }
  };

  return (
    <Container>
      {!modeloSelecionado ? (
        <EmailTemplates onModeloSelecionado={setModeloSelecionado} />
      ) : (
        renderizarFormulario()
      )}
    </Container>
  );
}

export default SendEmail;
