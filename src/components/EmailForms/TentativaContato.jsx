import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Box,
  Header
} from "../../pages/SendEmail/SendEmail.js";

import { MdOutlineArrowBack } from "react-icons/md";

function TentativaContato({ modelo, onSend, setModeloSelecionado }) {
  const [email, setEmail] = useState({
    destinatarios: [""],
    copia: ["segurancanotrabalho@doctorspraiagrande.com.br"],
    empresa: "",
    assunto: `Agendamento de Inspeção na`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
  });

  return (
    <Form>
      <Header>
        <MdOutlineArrowBack
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setModeloSelecionado(null)}
        />
        <h2>Enviar E-mail - Tentativa de Contato</h2>
      </Header>

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
          required
        />
      </Box>

      <Box>
        <Label htmlFor="destinatarios">Destinatário:</Label>
        <Input
          type="email"
          id="destinatarios"
          name="destinatarios"
          value={email.destinatarios}
          onChange={(e) =>
            setEmail({ ...email, destinatarios: e.target.value })
          }
          required
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
