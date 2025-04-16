import { useEffect, useState } from "react";
import { getPgrByMonth, monthMapping } from "../../api/pgrService";
import { format } from "date-fns";
import {
  Container,
  Header,
  Title,
  MonthSelector,
  TablePGR,
  TableContainer,
  Edit,
  ToggleDashboardButton,
  DashboardContainer,
} from "./styles";
import ModalEditPgr from "../../components/Modals/Home/ModalEditPgr/ModalEditPgr";
import { AiFillDashboard } from "react-icons/ai";
import DashboardPgr from "../DashboardPgr/DashboardPgr";
import { getPgrItemByCompany } from "../../api/pgrService";

const PgrPcmso = () => {
  const [month, setMonth] = useState("Janeiro");
  const [data, setData] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setIsDashboardOpen((prev) => !prev);
  };

  const handleOpenEditModal = (companyId) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null);
  };

  const handleUpdateData = async (updatedItem, companyId) => {
    try {
      const updatedFromAPI = await getPgrItemByCompany(companyId);
      if (!updatedFromAPI) return;
  
      setData((prevData) =>
        prevData.map((item) =>
          item.cd_id_company_doc === companyId ? updatedFromAPI : item
        )
      );
    } catch (error) {
      console.error("Erro ao buscar dados atualizados:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPgrByMonth(month);
      setData(result);
    };
    fetchData();
  }, [month]);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd/MM/yyyy");
  };

  const generateFilters = (data, dataIndex, isDate = false) => {
    const uniqueValues = [
      ...new Set(data.map((item) => item[dataIndex]).filter(Boolean)),
    ];

    return uniqueValues.map((value) => ({
      text: isDate ? formatDateForDisplay(value) : value,
      value: value, // mantém o valor original para o filtro funcionar corretamente
    }));
  };

  const getCompanyCellClass = (record) => {
    if (record.dt_submission_doc) return "col-submission";
    if (record.dt_definitive_doc) return "col-definitive-doc";
    if (record.dt_inspection) return "col-inspection";
    if (record.dt_basic_doc) return "col-basic-doc";
    if (record.dt_contele) return "col-contele";
    return "col-gray"; // nenhum preenchido
  };

  const columns = [
    {
      title: null,
      key: "actions",
      fixed: "right",
      className: "actions",
      render: (_, record) => (
        <Edit onClick={() => handleOpenEditModal(record.cd_id_company_doc)} />
      ),
    },
    {
      title: "CID",
      dataIndex: "sg_city",
      key: "sg_city",
      className: "col-gray radius",
      filters: generateFilters(data, "sg_city"),
      onFilter: (value, record) => record.sg_city === value,
    },
    {
      title: "Bairro",
      dataIndex: "neighb",
      key: "neighb",
      className: "col-gray text-left",
      filters: generateFilters(data, "neighb"),
      onFilter: (value, record) => record.neighb === value,
    },
    {
      title: "TO",
      dataIndex: "comp_cond",
      key: "comp_cond",
      className: "col-gray",
      filters: generateFilters(data, "comp_cond"),
      onFilter: (value, record) => record.comp_cond === value,
    },
    {
      title: "Empresa",
      dataIndex: "nm_comp_name",
      key: "nm_comp_name",
      className: "col-gray text-left", // mantém para o cabeçalho
      filters: generateFilters(data, "nm_comp_name"),
      onFilter: (value, record) => record.nm_comp_name === value,
      render: (_, record) => ({
        children: record.nm_comp_name,
        props: {
          className: getCompanyCellClass(record),
        },
      }),
    },
    {
      title: "CNPJ ",
      dataIndex: "cd_cnpj",
      key: "cd_cnpj",
      className: "col-gray",
      filters: generateFilters(data, "cd_cnpj"),
      onFilter: (value, record) => record.cd_cnpj === value,
    },
    {
      title: "Segmento",
      dataIndex: "segment",
      key: "segment",
      className: "col-gray",
      filters: generateFilters(data, "segment"),
      onFilter: (value, record) => record.segment === value,
    },
    {
      title: "TI",
      dataIndex: "ds_type_inspection",
      key: "ds_type_inspection",
      className: "col-gray",
      filters: generateFilters(data, "ds_type_inspection"),
      onFilter: (value, record) => record.ds_type_inspection === value,
    },
    {
      title: "LC",
      dataIndex: "dt_release",
      key: "dt_release",
      className: "col-gray",
      render: (text) => formatDateForDisplay(text),
      filters: generateFilters(data, "dt_release", true),
      onFilter: (value, record) => record.dt_release === value,
    },
    {
      title: "FI",
      dataIndex: "nm_type_service",
      key: "nm_type_service",
      className: "col-gray",
      filters: generateFilters(data, "nm_type_service"),
      onFilter: (value, record) => record.nm_type_service === value,
    },
    {
      title: "Contele Alimentado",
      className: "col-contele",
      children: [
        {
          title: "Data",
          dataIndex: "dt_contele",
          key: "dt_contele",
          className: "col-contele",
          render: (text) => formatDateForDisplay(text),
          filters: generateFilters(data, "dt_contele", true),
          onFilter: (value, record) => record.dt_contele === value,
        },
        {
          title: "Resp.",
          dataIndex: "resp_contele",
          key: "resp_contele",
          className: "col-contele",
          filters: generateFilters(data, "resp_contele"),
          onFilter: (value, record) => record.resp_contele === value,
        },
      ],
    },
    {
      title: "SOC+DOC Básico",
      className: "col-basic-doc",
      children: [
        {
          title: "Data",
          dataIndex: "dt_basic_doc",
          key: "dt_basic_doc",
          className: "col-basic-doc",
          render: (text) => formatDateForDisplay(text),
          filters: generateFilters(data, "dt_basic_doc", true),
          onFilter: (value, record) => record.dt_basic_doc === value,
        },
        {
          title: "Resp.",
          dataIndex: "resp_basic_doc",
          key: "resp_basic_doc",
          className: "col-basic-doc",
          filters: generateFilters(data, "resp_basic_doc"),
          onFilter: (value, record) => record.resp_basic_doc === value,
        },
      ],
    },
    {
      title: "Inspeção Técnica",
      className: "col-inspection",
      children: [
        {
          title: "Data",
          dataIndex: "dt_inspection",
          key: "dt_inspection",
          render: (text) => formatDateForDisplay(text),
          className: "col-inspection",
          filters: generateFilters(data, "dt_inspection", true),
          onFilter: (value, record) => record.dt_inspection === value,
        },
        {
          title: "Resp.",
          dataIndex: "resp_inspection",
          key: "resp_inspection",
          className: "col-inspection",
          filters: generateFilters(data, "resp_inspection"),
          onFilter: (value, record) => record.resp_inspection === value,
        },
      ],
    },
    {
      title: "SOC+DOC Definitivo",
      className: "col-definitive-doc",
      children: [
        {
          title: "Data",
          dataIndex: "dt_definitive_doc",
          key: "dt_definitive_doc",
          className: "col-definitive-doc",
          render: (text) => formatDateForDisplay(text),
          filters: generateFilters(data, "dt_definitive_doc", true),
          onFilter: (value, record) => record.dt_definitive_doc === value,
        },
        {
          title: "Resp.",
          dataIndex: "resp_definitive_doc",
          key: "resp_definitive_doc",
          className: "col-definitive-doc",
          filters: generateFilters(data, "resp_definitive_doc"),
          onFilter: (value, record) => record.resp_definitive_doc === value,
        },
      ],
    },
    {
      title: "Assinatura e Envio",
      className: "col-submission",
      children: [
        {
          title: "Data",
          dataIndex: "dt_submission_doc",
          key: "dt_submission_doc",
          className: "col-submission",
          render: (text) => formatDateForDisplay(text),
          filters: generateFilters(data, "dt_submision", true),
          onFilter: (value, record) => record.dt_submission_doc === value,
        },
        {
          title: "Resp.",
          dataIndex: "resp_submission_doc",
          key: "resp_submission_doc",
          className: "col-submission",
          filters: generateFilters(data, "resp_submission_doc"),
          onFilter: (value, record) => record.resp_submission_doc === value,
        },
      ],
    },
    {
      title: "Observações",
      dataIndex: "ds_obs",
      key: "ds_obs",
      className: "col-gray obs",
    },
  ];

  return (
    <Container>
      <Header>
        <ToggleDashboardButton onClick={toggleDashboard}>
          <AiFillDashboard className="btn" />
        </ToggleDashboardButton>
        <Title>Gestão e Controle de PGRs e PCMSOs</Title>
        <MonthSelector value={month} onChange={setMonth}>
          {Object.keys(monthMapping).map((m) => (
            <MonthSelector.Option key={m} value={m}>
              {m}
            </MonthSelector.Option>
          ))}
        </MonthSelector>
      </Header>

      <DashboardContainer $open={isDashboardOpen}>
        <h3>Resumo por Etapa</h3>
        <DashboardPgr data={data} />
      </DashboardContainer>

      <TableContainer>
        <TablePGR dataSource={data} columns={columns} rowKey="id_pgr_pcmso" />
      </TableContainer>

      <ModalEditPgr
        visible={isModalOpen}
        onClose={handleCloseModal}
        companyId={selectedCompanyId}
        updatePgrData={handleUpdateData}
      />
    </Container>
  );
};

export default PgrPcmso;
