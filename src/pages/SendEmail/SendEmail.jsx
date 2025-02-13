import { useState } from "react";
import axios from "axios";
import { Container, Form, Input, Button } from "./SendEmail.js"

function SendEmail() {
    const [email, setEmail] = useState({
      destinatario: "",
      copia: "",
      assunto: "",
    });
  
    const handleChange = (e) => {
      setEmail({ ...email, [e.target.name]: e.target.value });
    };
  
    const enviarEmail = async () => {
      try {
        await axios.post("http://127.0.0.1:5000/enviar-email", email);
        alert("E-mail enviado com sucesso!");
      } catch (error) {
        alert("Erro ao enviar o e-mail.");
        console.error(error);
      }
    };
  
    return (
      <Container>
        <Form>
          <h2>Enviar E-mail</h2>
          <Input
            type="email"
            name="destinatario"
            placeholder="Destinatário"
            value={email.destinatario}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="copia"
            placeholder="Cópia"
            value={email.copia}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="assunto"
            placeholder="Assunto"
            value={email.assunto}
            onChange={handleChange}
          />
          <Button onClick={enviarEmail}>Enviar E-mail</Button>
        </Form>
      </Container>
    );
  }
  
  export default SendEmail;
