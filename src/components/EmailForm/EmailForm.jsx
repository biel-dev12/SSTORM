import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Label,
  Box,
} from "../../pages/SendEmail/SendEmail.js";

const modelosEmail = [
  { value: "padrao", label: "Padrão", assunto: "Email padrão" },
  { value: "boas_vindas", label: "Boas-vindas", assunto: "Boas-vindas - " },
  { value: "aviso", label: "Aviso", assunto: "Aviso para:" },
];

function EmailForm({ onSend }) {
  const [email, setEmail] = useState({
    destinatario: "",
    copia: "",
    assunto: modelosEmail[0].assunto,
    modelo: "padrao",
  });

  const handleChange = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };

  const handleModeloChange = (e) => {
    const modeloSelecionado = modelosEmail.find(
      (m) => m.value === e.target.value
    );
    setEmail({
      ...email,
      modelo: modeloSelecionado.value,
      assunto: modeloSelecionado.assunto,
    });
  };

  return (
    <Form>
      <h2>Enviar E-mail</h2>

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
        <Label htmlFor="modelo">Modelo de E-mail:</Label>
        <Select
          id="modelo"
          name="modelo"
          value={email.modelo}
          onChange={handleModeloChange}
        >
          {modelosEmail.map((modelo) => (
            <option key={modelo.value} value={modelo.value}>
              {modelo.label}
            </option>
          ))}
        </Select>
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
