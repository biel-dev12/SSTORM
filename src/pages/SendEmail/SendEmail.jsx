import axios from "axios";
import { Container } from "./SendEmail.js";
import EmailForm from "../../components/EmailForm/EmailForm.jsx";

function SendEmail() {
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
      <EmailForm onSend={enviarEmail} />
    </Container>
  );
}

export default SendEmail;
