import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Box
} from "../../pages/SendEmail/SendEmail.js";

function TentativaContato({ modelo, onSend }) {
  const [email, setEmail] = useState({
    destinatarios: [""],
    copia: [
     
    ],
    empresa: "",
    assunto: `Agendamento de Inspeção na`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
  });

  return (
    <Form>
      <h2>Enviar E-mail - Tentativa de Contato</h2>

      <Box>
        <Label htmlFor="empresa">Razão Social:</Label>
        <Input
          type="text"
          id="empresa"
          name="empresa"
          value={email.empresa}
          onChange={(e) => {
            const novaEmpresa = e.target.value;
            const novoAssunto = `Agendamento de Inspeção na ${novaEmpresa}`;
            setEmail({ ...email, empresa: novaEmpresa, assunto: novoAssunto });
          }}
        />
      </Box>

      <Box>
        <Label htmlFor="destinatarios">Destinatário:</Label>
        <Input
          type="email"
          id="destinatarios"
          name="destinatarios"
          value={email.destinatarios}
          onChange={(e) => setEmail({ ...email, destinatarios: e.target.value })}
        />
      </Box>

      <Box>
        <Label htmlFor="copia">Cópia:</Label>
        <Input
          type="text"
          id="copia"
          name="copia"
          value={email.copia.join("; ")}
          onChange={(e) =>
            setEmail({ ...email, copia: e.target.value.split("; ") })
          }
          disabled
        />
      </Box>

      <Box>
        <Label htmlFor="assunto">Assunto:</Label>
        <Input
          type="text"
          id="assunto"
          name="assunto"
          value={email.assunto}
        onChange={(e) => {
            setEmail({ ...email, assunto: novoAssunto });
        }}
        />
      </Box>

      <Button onClick={() => onSend(email)}>Enviar E-mail</Button>
    </Form>
  );
}

export default TentativaContato;
