import { useEffect, useState } from "react";
import { fetchCompanies, updateCompany } from "../../api/companyService.js";
import { Container, Header, Title, DashboardGrid, Card, TableContainer, Table, TableRow, TableHead, TableCell, TableBody, Button, Input } from "./styles.js";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const DashboardPGR = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [companies, setCompanies] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedCompany, setEditedCompany] = useState({});

  useEffect(() => {
    fetchCompanies().then(setCompanies);
  }, []);

  const handleEdit = (id, field, value) => {
    setEditedCompany({ ...editedCompany, [field]: value });
    setEditingId(id);
  };

  const handleSave = async () => {
    await updateCompany(editingId, editedCompany);
    setEditingId(null);
  };

  return (
    <Container>
      <Header>
        <Title>Gestão de PGRs e PCMSOs</Title>
      </Header>
      
      <DashboardGrid>
        <Card>
          <h3>Documentos Emitidos</h3>
          <p>{dashboardData.totalDocuments || 0}</p>
        </Card>
        <Card>
          <h3>Inspeções Pendentes</h3>
          <p>{dashboardData.pendingInspections || 0}</p>
        </Card>
        <Card>
          <h3>Empresas com Prazos Vencendo</h3>
          <p>{dashboardData.expiringSoon || 0}</p>
        </Card>
      </DashboardGrid>
      
      <BarChart width={600} height={300} data={dashboardData.segments || []}>
        <XAxis dataKey="nm_segment" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>

      <PieChart width={400} height={400}>
        <Pie data={dashboardData.statuses || []} dataKey="value" nameKey="status" outerRadius={100}>
          <Cell fill="#00C49F" />
          <Cell fill="#FFBB28" />
          <Cell fill="#FF8042" />
        </Pie>
      </PieChart>

      <TableContainer>
        <h3>Gestão de Empresas</h3>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Empresa</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Cidade</TableCell>
              <TableCell>Segmento</TableCell>
              <TableCell>CNPJ</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id_company}>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input value={editedCompany.nm_comp_name || company.nm_comp_name} onChange={(e) => handleEdit(company.id_company, "nm_comp_name", e.target.value)} />
                  ) : (
                    company.nm_comp_name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input value={editedCompany.nm_neighborhood || company.nm_neighborhood} onChange={(e) => handleEdit(company.id_company, "nm_neighborhood", e.target.value)} />
                  ) : (
                    company.nm_neighborhood
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input value={editedCompany.sg_city || company.sg_city} onChange={(e) => handleEdit(company.id_company, "sg_city", e.target.value)} />
                  ) : (
                    company.sg_city
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input value={editedCompany.nm_segment || company.nm_segment} onChange={(e) => handleEdit(company.id_company, "nm_segment", e.target.value)} />
                  ) : (
                    company.nm_segment
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input value={editedCompany.cd_cnpj || company.cd_cnpj} onChange={(e) => handleEdit(company.id_company, "cd_cnpj", e.target.value)} />
                  ) : (
                    company.cd_cnpj
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Input type="month" value={editedCompany.ds_month_validity || company.ds_month_validity} onChange={(e) => handleEdit(company.id_company, "ds_month_validity", e.target.value)} />
                  ) : (
                    company.ds_month_validity
                  )}
                </TableCell>
                <TableCell>
                  {editingId === company.id_company ? (
                    <Button onClick={handleSave}>Salvar</Button>
                  ) : (
                    <Button onClick={() => setEditingId(company.id_company)}>Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DashboardPGR;
