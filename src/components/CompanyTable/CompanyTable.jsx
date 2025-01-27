import { useEffect, useState } from "react";
import { fetchCompanies, updateCompany } from "../../api/companyService.js";
import { format, parse } from "date-fns";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  Button,
  Input,
  EditIcon,
} from "./style";
import { IoMdCloseCircle } from "react-icons/io";
import ModalEditComp from "../Modals/CompanyTable/ModalEditComp/ModalEditComp";

function CompanyTable({ month }) {
  const [companies, setCompanies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [modal2Visible, setModal2Visible] = useState(false);

  useEffect(() => {
    fetchCompanies(month, setCompanies);
  }, [month]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = parse(dateString, "yyyy-MM-dd", new Date());
      return format(date, "dd/MM/yyyy");
    } catch (error) {
      return "";
    }
  };

  const openEditModal = (company) => {
    setSelectedCompany({
      nm_comp_name: company.nm_comp_name || "",
      nm_neighborhood: company.nm_neighborhood || "",
      cd_comp_or_cond: company.cd_comp_or_cond || "",
      sg_city: company.sg_city || "",
      cd_cnpj: company.cd_cnpj || "",
      cd_id_segment: 2,
      ti: company.ti || "",
      lc: company.lc || "",
      fi: company.fi || "",
      dt_contele: company.dt_contele || "",
      resp_contele: company.resp_contele || "",
      dt_basic: company.dt_basic || "",
      resp_basic: company.resp_basic || "",
      dt_insp: company.dt_insp || "",
      resp_insp: company.resp_insp || "",
      dt_doc_def: company.dt_doc_def || "",
      resp_doc_def: company.resp_doc_def || "",
      dt_env: company.dt_env || "",
      resp_env: company.resp_env || "",
      tr: company.tr || "",
      observacoes: company.observacoes || "",
      id_company: company.id_company,
    });
    setModalVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedCompany(null);
  };

  const handleInputChange = (field, value) => {
    setSelectedCompany((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveChanges = async () => {
    if (
      !selectedCompany.nm_comp_name ||
      selectedCompany.nm_comp_name.trim() === ""
    ) {
      alert("O campo Nome da Empresa é obrigatório!");
      return;
    }

    console.log(selectedCompany);

    try {
      await updateCompany(selectedCompany.id_company, selectedCompany);
      setCompanies((prev) =>
        prev.map((company) =>
          company.id_company === selectedCompany.id_company
            ? selectedCompany
            : company
        )
      );
      closeEditModal();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
    }
  };

  const renderCell = (company, field, className) => {
    return (
      <TableCell className={className} alignCenter noWrap>
        {field === "cd_cnpj" ||
        field === "sg_city" ||
        field === "nm_neighborhood" ||
        field === "nm_comp_or_cond" || field === "cd_id_segment" ? (
          <span>{company[field]}</span>
        ) : field.includes("dt") || field === "lc" ? (
          formatDate(company[field])
        ) : (
          company[field]
        )}
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell alignCenter className="head" rowSpan={2}>
                Editar
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                CID
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                Bairro
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                TO
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                Empresa
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                Segmento
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                CNPJ
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                TI
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                LC
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                FI
              </TableCell>
              <TableCell alignCenter className="head contele" colSpan={2}>
                Contele Alimentado
              </TableCell>
              <TableCell alignCenter className="head basic" colSpan={2}>
                SOC+DOC Básico
              </TableCell>
              <TableCell alignCenter className="head insp" colSpan={2}>
                Inspeção Técnica
              </TableCell>
              <TableCell alignCenter className="head doc-def" colSpan={2}>
                SOC+DOC Definitivo
              </TableCell>
              <TableCell alignCenter className="head env" colSpan={2}>
                Assinatura e Envio
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                TR
              </TableCell>
              <TableCell alignCenter className="head" rowSpan={2}>
                Observações
              </TableCell>
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
                <TableCell alignCenter>
                  <EditIcon
                    size={18}
                    cursor="pointer"
                    onClick={() => setModal2Visible(true)}
                  />
                </TableCell>
                {renderCell(company, "sg_city")}
                {renderCell(company, "nm_neighborhood")}
                {renderCell(company, "nm_comp_or_cond")}
                {renderCell(company, "nm_comp_name", "comp")}
                {renderCell(company, "cd_id_segment", "comp")}
                {renderCell(company, "cd_cnpj")}
                {renderCell(company, "ti")}
                {renderCell(company, "lc")}
                {renderCell(company, "fi")}
                {renderCell(company, "dt_contele", "contele")}
                {renderCell(company, "resp_contele", "contele")}
                {renderCell(company, "dt_basic", "basic")}
                {renderCell(company, "resp_basic", "basic")}
                {renderCell(company, "dt_insp", "insp")}
                {renderCell(company, "resp_insp", "insp")}
                {renderCell(company, "dt_doc_def", "doc-def")}
                {renderCell(company, "resp_doc_def", "doc-def")}
                {renderCell(company, "dt_env", "env")}
                {renderCell(company, "resp_env", "env")}
                {renderCell(company, "tr")}
                {renderCell(company, "observacoes")}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {modalVisible && selectedCompany && (
        <Modal>
          <ModalHeader>
            <h2>Editar Empresa</h2>
            <button onClick={closeEditModal}>
              <IoMdCloseCircle />
            </button>
          </ModalHeader>
          <ModalContent>
            <label>Nome da Empresa:</label>
            <Input
              type="text"
              value={selectedCompany.nm_comp_name || ""}
              onChange={(e) =>
                handleInputChange("nm_comp_name", e.target.value)
              }
            />
            <label>Bairro:</label>
            <Input
              type="text"
              value={selectedCompany.nm_neighborhood || ""}
              onChange={(e) =>
                handleInputChange("nm_neighborhood", e.target.value)
              }
            />
            <label>CNPJ:</label>
            <Input
              type="text"
              value={selectedCompany.cd_cnpj || ""}
              onChange={(e) => handleInputChange("cd_cnpj", e.target.value)}
            />
          </ModalContent>
          <ModalFooter>
            <Button primary onClick={saveChanges}>
              Salvar
            </Button>
            <Button onClick={closeEditModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      )}

      <ModalEditComp
        visible={modal2Visible}
        onClose={() => setModal2Visible(false)}
        companyData={selectedCompany}
        exitCompany={setSelectedCompany}
      />
    </>
  );
}

export default CompanyTable;
