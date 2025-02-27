import { useState } from "react";
import {
  Form,
  Input,
  Button,
  Label,
  Box,
  RemoveDest,
  AddDest,
  Header
} from "../../pages/SendEmail/SendEmail.js";

import { MdOutlineArrowBack } from "react-icons/md";

function InformeTecnico({ modelo, onSend, setModeloSelecionado }) {
  const [email, setEmail] = useState({
    destinatarios: [""],
    copia: ["segurancanotrabalho@doctorspraiagrande.com.br"],
    assunto: `Envio de Informe Técnico e Modelos de Ficha de EPI e OS - Ordem de Serviço`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
  });

  const handleDestinatarioChange = (index, value) => {
    const novosDestinatarios = [...email.destinatarios];
    novosDestinatarios[index] = value;
    setEmail({ ...email, destinatarios: novosDestinatarios });
  };

  const adicionarDestinatario = () => {
    if (email.destinatarios.length < 10) {
      setEmail({ ...email, destinatarios: [...email.destinatarios, ""] });
    }
  };

  const removerDestinatario = (index) => {
    const novosDestinatarios = email.destinatarios.filter(
      (_, i) => i !== index
    );
    setEmail({ ...email, destinatarios: novosDestinatarios });
  };

  return (
    <Form>
      <Header>
        <MdOutlineArrowBack
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setModeloSelecionado(null)}
        />
        <h2>Enviar E-mail - Empresa não Atende</h2>
      </Header>

      <Box>
        <Label>Destinatários:</Label>
        {email.destinatarios.map((dest, index) => (
          <div className="dest" key={index}>
            <Input
              type="email"
              value={dest}
              onChange={(e) => handleDestinatarioChange(index, e.target.value)}
            />
            <RemoveDest
              type="button"
              onClick={() => removerDestinatario(index)}
              disabled={email.destinatarios.length === 1}
            />
          </div>
        ))}
        {email.destinatarios.length < 10 && (
          <AddDest type="button" onClick={adicionarDestinatario} />
        )}
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
          onChange={(e) => setEmail({ ...email, assunto: e.target.value })}
        />
      </Box>

      <Button onClick={() => onSend(email)}>Enviar E-mail</Button>
    </Form>
  );
}

export default InformeTecnico;
