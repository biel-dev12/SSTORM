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

function EmpresaNaoAtende({ modelo, onSend, setModeloSelecionado}) {
  const [email, setEmail] = useState({
    destinatarios: ["comercial@doctorspraiagrande.com.br"],
    copia: ["segurancanotrabalho@doctorspraiagrande.com.br", "ricardo@doctorspraiagrande.com.br"],
    empresa: "",
    assunto: `Situação da Empresa`,
    modelo: modelo.nome,
    departamento: modelo.departamento,
    mes: "",
  });

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
        <Label htmlFor="empresa">Razão Social:</Label>
        <Input
          type="text"
          id="empresa"
          name="empresa"
          value={email.empresa}
          onChange={(e) => {
            const novaEmpresa = e.target.value;
            const novoAssunto = `Situação da Empresa ${novaEmpresa}`;
            setEmail({ ...email, empresa: novaEmpresa, assunto: novoAssunto });
          }}
        />
      </Box>

            <Box>
        <Label htmlFor="mes">Mês:</Label>
        <select
          id="mes"
          name="mes"
          value={email.mes}
          onChange={(e) => setEmail({ ...email, mes: e.target.value })}
        >
          <option value="">Selecione o mês</option>
          {[
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
          ].map((mes, index) => (
            <option key={index} value={mes}>
              {mes}
            </option>
          ))}
        </select>
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
          disabled
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

export default EmpresaNaoAtende;
