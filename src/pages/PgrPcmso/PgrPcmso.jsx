import { useEffect, useState } from "react";
import { Container, Header, Title, MonthSelector } from "./styles"
import CompanyTable from "../../components/CompanyTable/CompanyTable";

const PgrPcmso = () => {
  const currentMonth = new Date().getMonth() + 1;
  const [month, setMonth] = useState(currentMonth);

  const months = [
    { name: "janeiro", value: "01" },
    { name: "fevereiro", value: "02" },
    { name: "março", value: "03" },
    { name: "abril", value: "04" },
    { name: "maio", value: "05" },
    { name: "junho", value: "06" },
    { name: "julho", value: "07" },
    { name: "agosto", value: "08" },
    { name: "setembro", value: "09" },
    { name: "outubro", value: "10" },
    { name: "novembro", value: "11" },
    { name: "dezembro", value: "12" },
  ];

  useEffect(() => {
    console.log(month)
  }, [month])

  return (
    <Container>
      <Header>
        <Title>Gestão e Controle de PGRs e PCMSOs</Title>
        <MonthSelector
          value={month}
          onChange={(e) => setMonth(e.target.value)} 
        >
          {months.map((m) => (
            <option key={m.value} value={m.value}>
              {m.name.charAt(0).toUpperCase() + m.name.slice(1)}
            </option>
          ))}
        </MonthSelector>
      </Header>
      <CompanyTable month={month} />
    </Container>
  );
};

export default PgrPcmso;
