import { useEffect, useState } from "react";
import { fetchCompanies, updateCompany } from "../../api/companyService";
import { format, parse } from "date-fns"; 
import CityList from "../Responses/CityListTable"; 
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableInput
} from "./style";

function CompanyTable({ month }) {
  const [companies, setCompanies] = useState([]);
  const [editingCell, setEditingCell] = useState({
    companyId: null,
    field: null,
    value: "",
  });

  useEffect(() => {
    fetchCompanies(month, setCompanies);
  }, [month]);

  const handleDoubleClick = (companyId, field, currentValue) => {
    setEditingCell({ companyId, field, value: currentValue });
  };

  const handleChange = (e) => {
    setEditingCell((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleBlur = async () => {
    const { companyId, field, value } = editingCell;
    // await updateCompany(companyId, { [field]: value });
    console.log(editingCell)
    setCompanies((prev) =>
      prev.map((c) =>
        c.id_company === companyId ? { ...c, [field]: value } : c
      )
    );
    setEditingCell({ companyId: null, field: null, value: "" });
  };

  const renderEditableCell = (company, field, className) => {
    const isEditing =
      editingCell.companyId === company.id_company &&
      editingCell.field === field;
  
    const formatDate = (dateString) => {
      if (!dateString) return "";
      try {
        const date = parse(dateString, "yyyy-MM-dd", new Date());
        return format(date, "dd/MM/yyyy");
      } catch (error) {
        return "";
      }
    };
  
    return (
      <TableCell
        className={className}
        alignCenter
        noWrap
        onDoubleClick={() =>
          handleDoubleClick(company.id_company, field, company[field])
        }
      >
        {isEditing ? (
          field === "cd_cnpj" ? (
            <span>{company[field]}</span>
          ) : field === "sg_city" ? (
            <CityList
              value={editingCell.value}
              onChange={(value) =>
                setEditingCell((prev) => ({ ...prev, value }))
              }
            />
          ) : field.includes("dt") || field === "lc" ? (
            <TableInput
              type="date"
              value={editingCell.value}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <TableInput
              type="text"
              value={editingCell.value}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
            />
          )
        ) : field === "cd_cnpj" ? (
          <span>{company[field]}</span>
        ) : field === "sg_city" ? (
          company[field]
        ) : field.includes("dt") || field === "lc" ? (
          formatDate(company[field])
        ) : (
          company[field]
        )}
      </TableCell>
    );
  };
  

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell alignCenter className="head" rowSpan={2}>CID</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>Bairro</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>TO</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>Empresa</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>CNPJ</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>TI</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>LC</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>FI</TableCell>
            <TableCell alignCenter className="head contele" colSpan={2}>Contele Alimentado</TableCell>
            <TableCell alignCenter className="head basic" colSpan={2}>SOC+DOC Básico</TableCell>
            <TableCell alignCenter className="head insp" colSpan={2}>Inspeção Técnica</TableCell>
            <TableCell alignCenter className="head doc-def" colSpan={2}>SOC+DOC Definitivo</TableCell>
            <TableCell alignCenter className="head env" colSpan={2}>Assinatura e Envio</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>TR</TableCell>
            <TableCell alignCenter className="head" rowSpan={2}>Observações</TableCell>
          </TableRow>
          <TableRow>
            {["contele", "basic", "insp", "doc-def", "env"].map((type) => (
              <>
                <TableCell alignCenter className={`head ${type}`} small>
                  Data
                </TableCell>
                <TableCell alignCenter className={`head ${type}`} small>
                  Resp.
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id_company}>
              {renderEditableCell(company, "sg_city")}
              {renderEditableCell(company, "nm_neighborhood")}
              {renderEditableCell(company, "nm_comp_or_cond")}
              {renderEditableCell(company, "nm_comp_name", "comp")}
              {renderEditableCell(company, "cd_cnpj")}
              {renderEditableCell(company, "ti")}
              {renderEditableCell(company, "lc")}
              {renderEditableCell(company, "fi")}
              {renderEditableCell(company, "dt_contele", "contele")}
              {renderEditableCell(company, "resp_contele", "contele")}
              {renderEditableCell(company, "dt_basic", "basic")}
              {renderEditableCell(company, "resp_basic", "basic")}
              {renderEditableCell(company, "dt_insp", "insp")}
              {renderEditableCell(company, "resp_insp", "insp")}
              {renderEditableCell(company, "dt_doc_def", "doc-def")}
              {renderEditableCell(company, "resp_doc_def", "doc-def")}
              {renderEditableCell(company, "dt_env", "env")}
              {renderEditableCell(company, "resp_env", "env")}
              {renderEditableCell(company, "tr")}
              {renderEditableCell(company, "observacoes")}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CompanyTable;
