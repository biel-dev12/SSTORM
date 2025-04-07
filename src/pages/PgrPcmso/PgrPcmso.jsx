import { useEffect, useState } from "react";
import { getPgrByMonth, monthMapping } from "../../api/pgrService";
import { format } from "date-fns";
import { Container, Header, Title, MonthSelector, TablePGR } from "./styles";

const PgrPcmso = () => {
  const [month, setMonth] = useState("Janeiro");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPgrByMonth(month);
      setData(result);
      console.log(result);
    };
    fetchData();
  }, [month]);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  const columns = [
    {
      title: "CID",
      dataIndex: "sg_city",
      key: "sg_city",
      className: "col-gray",
    },
    {
      title: "Bairro",
      dataIndex: "neighb",
      key: "neighb",
      className: "col-gray",
    },
    {
      title: "Empresa",
      dataIndex: "nm_comp_name",
      key: "nm_comp_name",
      className: "col-gray",
    },
    {
      title: "Tipo Inspeção",
      dataIndex: "ds_type_inspection",
      key: "ds_type_inspection",
      className: "col-gray",
    },
    {
      title: "Data Liberação",
      dataIndex: "dt_release",
      key: "dt_release",
      className: "col-gray",
      render: (text) => formatDateForDisplay(text),
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
        },
        { title: "Resp.", dataIndex: "resp_contele", key: "resp_contele",
          className: "col-contele" },
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
        },
        { title: "Resp.", dataIndex: "resp_basic_doc", key: "resp_basic_doc",
      className: "col-basic-doc", },
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
        },
        {
          title: "Resp.",
          dataIndex: "resp_inspection",
          key: "resp_inspection",
          className: "col-inspection",
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
        },
        {
          title: "Resp.",
          dataIndex: "resp_definitive_doc",
          key: "resp_definitive_doc",
          className: "col-definitive-doc",
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
        },
        {
          title: "Resp.",
          dataIndex: "resp_submission_doc",
          key: "resp_submission_doc",
          className: "col-submission",
        },
      ],
    },
    { title: "Observações", dataIndex: "ds_obs", key: "ds_obs",
      className: "col-gray" },
  ];

  return (
    <Container>
      <Header>
        <Title>Gestão e Controle de PGRs e PCMSOs</Title>
        <MonthSelector value={month} onChange={setMonth}>
          {Object.keys(monthMapping).map((m) => (
            <MonthSelector.Option key={m} value={m}>
              {m}
            </MonthSelector.Option>
          ))}
        </MonthSelector>
      </Header>
      <TablePGR dataSource={data} columns={columns} rowKey="id_pgr_pcmso" />
    </Container>
  );
};

export default PgrPcmso;
