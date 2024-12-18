import { useEffect, useState } from "react";
import { fetchCompanies } from "../../api/companyService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "./style";

function CompanyTable({ month }) {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies(month, setCompanies);
  }, [month]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell alignCenter rowSpan={2}>
              CID
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Bairro
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              TO
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Empresa
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              CNPJ
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Segmento
            </TableCell>
            <TableCell alignCenter colSpan={2}>
              Contele Alimentado
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              SOC+DOC Básica
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Inspeção Técnica
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              SOC+DOC Definitivo
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Assinatura e Envio
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              TR
            </TableCell>
            <TableCell alignCenter rowSpan={2}>
              Observações
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell alignCenter>Data</TableCell>
            <TableCell alignCenter>Pessoa</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id_company}>
              <TableCell alignCenter>{company.sg_city}</TableCell>
              <TableCell>{company.nm_neighborhood}</TableCell>
              <TableCell alignCenter>{company.nm_comp_or_cond}</TableCell>
              <TableCell noWrap>{company.nm_comp_name}</TableCell>
              <TableCell noWrap>{company.cd_cnpj}</TableCell>
              <TableCell alignCenter noWrap>
                {company.nm_segment}
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020
              </TableCell>
              <TableCell alignCenter noWrap>
                Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020 - Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020 - Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020 - Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020 - Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                01/01/2020 - Beatriz
              </TableCell>
              <TableCell alignCenter noWrap>
                Inativada SOC
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;
