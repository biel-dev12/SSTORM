import { useState } from "react";
import { Form, Input, Button, Label, Box } from "../../pages/SendEmail/SendEmail.js";

function EmailForm({ modelo, onSend }) {
  const [email, setEmail] = useState({
    destinatario: "",
    copia: "",
    assunto: `Assunto para ${modelo.nome}`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
    codigoEnvio: modelo.codigoEnvio,
  });

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  return (
    <Form>
      <h2>Enviar E-mail ({modelo.nome})</h2>

      <Box>
        <Label htmlFor="destinatario">Destinatário:</Label>
        <Input
          type="email"
          id="destinatario"
          name="destinatario"
          value={email.destinatario}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <Label htmlFor="copia">Cópia (separe e-mails com ;):</Label>
        <Input
          type="text"
          id="copia"
          name="copia"
          value={email.copia}
          onChange={handleChange}
        />
      </Box>

      <Box>
        <Label htmlFor="assunto">Assunto:</Label>
        <Input
          type="text"
          id="assunto"
          name="assunto"
          value={email.assunto}
          onChange={handleChange}
        />
      </Box>

      <Button onClick={() => onSend(email)}>Enviar E-mail</Button>
    </Form>
  );
}

export default EmailForm;
