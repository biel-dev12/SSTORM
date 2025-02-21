import axios from "axios";
import { useState } from "react";
import { Container } from "./SendEmail.js";
import EmailTemplates from "../../components/EmailTemplates/EmailTemplates.jsx";
import InformeTecnico from "../../components/EmailForms/InformeTecnico.jsx";
import SemContato from "../../components/EmailForms/SemContato.jsx";

function SendEmail() {
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const enviarEmail = async (email) => {
    try {
      await axios.post(
        "http://192.168.1.55:5000/enviar-email",
        { ...email }, // Garante que o objeto seja serializado corretamente
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
      alert("E-mail enviado com sucesso!");
    } catch (error) {
      alert("Erro ao enviar o e-mail.");
      console.error("Erro:", error.response ? error.response.data : error.message);
    }
  };
  

  const renderizarFormulario = () => {
    if (!modeloSelecionado) return null;

    switch (modeloSelecionado.nome) {
      case "informe_tecnico":
        return <InformeTecnico modelo={modeloSelecionado} onSend={enviarEmail} />;
      case "agendamento_inspecao":
        return <SemContato modelo={modeloSelecionado} onSend={enviarEmail} />;
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
