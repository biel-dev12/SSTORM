import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Box,
} from "../../pages/SendEmail/SendEmail.js";

function InformeTecnico({ modelo, onSend }) {
  const [email, setEmail] = useState({
    destinatario: "",
    copia: [], //segurancanotrabalho@doctorspraiagrande.com.br; ricardo@doctorspraiagrande.com.br
    assunto: `Envio de Informe Técnico e Modelos de Ficha de EPI e OS - Ordem de Serviço`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
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
        <Label htmlFor="copia">Copia:</Label>
        <Input
          type="text"
          id="copia"
          name="copia"
          value={email.copia.join("; ")} // Exibe como string separada por "; "
          onChange={(e) =>
            setEmail({ ...email, copia: e.target.value.split("; ") })
          } // Transforma string em array
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

export default InformeTecnico;
