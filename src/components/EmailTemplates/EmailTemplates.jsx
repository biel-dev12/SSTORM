import { useState, useEffect } from "react";
import axios from "axios";
import { Models, Title } from "../../pages/SendEmail/SendEmail.js";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { MdOutlineExpandMore } from "react-icons/md";
import { Button } from "@mui/material";

function EmailTemplates({ onModeloSelecionado }) {
  const [departamentos, setDepartamentos] = useState({});
  const [departamentoSelecionado, setDepartamentoSelecionado] = useState(null);

  useEffect(() => {
    async function fetchDepartamentos() {
      try {
        const response = await axios.get("http://192.168.1.55:5000/email-templates");
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Erro ao buscar departamentos:", error);
      }
    }
    fetchDepartamentos();
  }, []);

  const handleSelectDepartamento = (departamento) => {
    setDepartamentoSelecionado(departamentoSelecionado === departamento ? null : departamento);
  };

  const gerarCodigoEnvio = (departamento, modelo) => {
    return `${departamento}_${modelo}_${new Date().getTime()}`;
  };

  return (
    <Models>
      <Title>Envio Automático de E-mails</Title>

      {Object.keys(departamentos).map((departamento) => (
        <Accordion key={departamento} expanded={departamentoSelecionado === departamento}>
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            onClick={() => handleSelectDepartamento(departamento)}
          >
            <p>{departamento}</p>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(departamentos[departamento]).map((modelo) => (
              <Button
                key={modelo}
                variant="outlined"
                onClick={() =>
                  onModeloSelecionado({
                    nome: modelo,
                    departamento,
                    codigoEnvio: gerarCodigoEnvio(departamento, modelo),
                  })
                }
                style={{ marginBottom: "5px" }}
              >
                {modelo.replace("_", " ").toUpperCase()}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Models>
  );
}

export default EmailTemplates;
