import axios from "axios";
import { useState } from "react";
import { Container } from "./SendEmail.js";
import EmailForm from "../../components/EmailForm/EmailForm.jsx";
import EmailTemplates from "../../components/EmailTemplates/EmailTemplates.jsx";

function SendEmail() {
  const [modeloSelecionado, setModeloSelecionado] = useState(null);

  const enviarEmail = async (email) => {
    try {
      await axios.post("http://192.168.1.55:5000/enviar-email", email);
      alert("E-mail enviado com sucesso!");
    } catch (error) {
      alert("Erro ao enviar o e-mail.");
      console.error(error);
    }
  };

  return (
    <Container>
      {!modeloSelecionado ? (
        <EmailTemplates onModeloSelecionado={setModeloSelecionado} />
      ) : (
        <EmailForm modelo={modeloSelecionado} onSend={enviarEmail} />
      )}
    </Container>
  );
}

export default SendEmail;
