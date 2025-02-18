import { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Label,
  Box,
} from "../../pages/SendEmail/SendEmail.js";
import axios from "axios";

function EmailForm({ onSend }) {
  const [email, setEmail] = useState({
    destinatario: "",
    copia: "",
    assunto: "",
    modelo: "",
  });

  const [modelosEmail, setModelosEmail] = useState([]);

  // Buscar modelos do backend ao carregar a página
  useEffect(() => {
    async function fetchModelos() {
      try {
        const response = await axios.get("http://192.168.1.55:5000/email-templates");
        const modelos = response.data;

        setModelosEmail(modelos);
        
        // Definir o primeiro modelo como padrão
        if (modelos.length > 0) {
          setEmail((prev) => ({
            ...prev,
            modelo: modelos[0].value,
            assunto: modelos[0].assunto || "",
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar modelos de e-mail:", error);
      }
    }
    fetchModelos();
  }, []);

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
      assunto: modeloSelecionado.assunto || "",
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
