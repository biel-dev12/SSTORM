import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  DashboardWrapper,
  ChartsRow,
  ChartBox,
  KPIRow,
  KPIBox,
} from "./styles";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

const DashboardPgr = ({ data }) => {
  const totalEmpresas = data.length;
  const totalAval = data.filter((d) => d.nm_type_service === "Aval").length;
  const totalReaval = data.filter((d) => d.nm_type_service === "Reaval").length;
  const totalInspecoes = data.filter((d) => d.dt_inspection).length;

  const etapasConcluidas = [
    { name: "Contele", value: data.filter((d) => d.dt_contele).length },
    { name: "Doc Básico", value: data.filter((d) => d.dt_basic_doc).length },
    { name: "Inspeção", value: data.filter((d) => d.dt_inspection).length },
    { name: "Definitivo", value: data.filter((d) => d.dt_definitive_doc).length },
    { name: "Enviado", value: data.filter((d) => d.dt_submission_doc).length },
  ];

  const tipoInspecao = [
    { name: "Aval", value: totalAval },
    { name: "Reaval", value: totalReaval },
  ];

  return (
    <DashboardWrapper>
      <KPIRow>
        <KPIBox>Total Empresas: {totalEmpresas}</KPIBox>
        <KPIBox>Aval: {totalAval}</KPIBox>
        <KPIBox>Reaval: {totalReaval}</KPIBox>
        <KPIBox>Inspeções feitas: {totalInspecoes}</KPIBox>
      </KPIRow>

      <ChartsRow>
        <ChartBox>
          <h4>Etapas Concluídas</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={etapasConcluidas}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>

        <ChartBox>
          <h4>Tipo de Inspeção</h4>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={tipoInspecao}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
              >
                {tipoInspecao.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </ChartsRow>
    </DashboardWrapper>
  );
};

export default DashboardPgr;
