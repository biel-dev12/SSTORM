import { useState } from "react";
import {
  Form,
  Button,
  Label,
  Box,
  Header
} from "../../pages/SendEmail/SendEmail.js";

import { MdOutlineArrowBack } from "react-icons/md";

function LembreteHeali({ modelo, onSend, setModeloSelecionado }) {
  const [mesesSelecionados, setMesesSelecionados] = useState([]);

  const meses = [
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
    "Dezembro"
  ];

  const toggleMes = (numeroMes) => {
    setMesesSelecionados((prev) =>
      prev.includes(numeroMes)
        ? prev.filter((m) => m !== numeroMes)
        : [...prev, numeroMes]
    );
  };

  const handleEnviar = () => {
    const payload = {
      modelo: modelo.nome,
      departamento: modelo.departamento,
      meses: mesesSelecionados,
    };
    onSend(payload);
  };

  return (
    <Form>
      <Header>
        <MdOutlineArrowBack
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => setModeloSelecionado(null)}
        />
        <h2>Enviar E-mail - Lembrete HEALI</h2>
      </Header>

      <Box className="box-aep">
        <Label>Meses:</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {meses.map((mes, index) => (
            <label key={index} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="checkbox"
                value={index + 1}
                checked={mesesSelecionados.includes(index + 1)}
                onChange={() => toggleMes(index + 1)}
              />
              {mes}
            </label>
          ))}
        </div>
      </Box>

      <Button onClick={handleEnviar}>Enviar E-mail</Button>
    </Form>
  );
}

export default LembreteHeali;
