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

  const openEditModalPgr = (company) => {
    setSelectedCompany({
      id_company: company.id_company,
      cd_id_company_doc: company.id_company,
      ds_type_inspection: company.ds_type_inspection || "",
      dt_release: company.dt_release || "",
      ds_type_service: company.ds_type_service || "",
      dt_contele: company.dt_contele || "",
      cd_id_contele_tec: company.cd_id_contele_tec || "",
      dt_basic_doc: company.dt_basic_doc || "",
      cd_id_bas_doc_tec: company.cd_id_bas_doc_tec || "",
      dt_inspection: company.dt_inspection || "",
      cd_id_insp_tec: company.cd_id_insp_tec || "",
      dt_definitive_doc: company.dt_definitive_doc || "",
      cd_id_def_doc_tec: company.cd_id_def_doc_tec || "",
      dt_submission_doc: company.dt_submission_doc || "",
      cd_id_sub_tec: company.cd_id_sub_tec || "",
      ds_obs: company.ds_obs || "",
    });
  
    setModal2Visible(true);
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
        field === "nm_comp_or_cond" ||
        field === "cd_id_segment" ? (
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
                    onClick={() => openEditModalPgr(company)}
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

                {modal2Visible &&
                  selectedCompany?.id_company === company.id_company && (
                    <ModalEditComp
                      visible={modal2Visible}
                      onClose={() => setModal2Visible(false)}
                    />
                  )}
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
    </>
  );
}

export default CompanyTable;
