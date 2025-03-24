import { useState, useEffect } from "react";
import {
  Main,
  SearchBox,
  CompanyLabel,
  ChoiceBox,
  RadioBox,
  Radio,
  InputBox,
  SearchIcon,
  ActionsBox,
  ActionBtn,
  CardsBox,
  Card,
  HeaderCard,
  IconCard,
  BodyCard,
  ItemCard,
  StatusIcon,
  TextStatus,
  CheckIcon,
  CompanyDisplay,
} from "./style";
import { MdAddCircle, MdDelete, MdOutlineBorderColor } from "react-icons/md";
import { IoArrowUndo } from "react-icons/io5";
import ModalEditPgr from "../../components/Modals/Home/ModalEditPgr/ModalEditPgr";
import ModalAddComp from "../../components/Modals/Home/ModalAddComp/ModalAddComp";
import ModalEditComp from "../../components/Modals/Home/ModalEditComp/ModalEditComp";
import ModalDelComp from "../../components/Modals/Home/ModalDelComp/ModalDelComp";
import { getCompany } from "../../api/companyService";
import { getPgrByCompany } from "../../api/pgrService";
import { getTechById } from "../../api/techService";
import { toast } from "react-toastify";
import { format } from "date-fns";

const Home = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modalPgrVisible, setModalPgrVisible] = useState(false);

  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [pgrData, setPgrData] = useState(null);
  const [techs, setTechs] = useState({});

  useEffect(() => {
    if (selectedCompany) {
      setPgrData(getPgrByCompany(selectedCompany.id_company));
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (pgrData) {
      const fetchTechs = async () => {
        const techFields = [
          "cd_id_contele_tec",
          "cd_id_bas_doc_tec",
          "cd_id_insp_tec",
          "cd_id_def_doc_tec",
          "cd_id_sub_tec",
        ];

        const techPromises = techFields.map(async (field) => {
          if (pgrData[field]) {
            const name = await getTechById(pgrData[field]);
            return { [field]: name };
          }
          return { [field]: "N/A" };
        });

        const results = await Promise.all(techPromises);
        const techMap = Object.assign({}, ...results);

        setTechs(techMap);
      };

      fetchTechs();
    }
  }, [pgrData]);

  const updatePgrData = (updatePgr) => {
    setPgrData(updatePgr);
  };

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "Sem data";
    return format(new Date(dateString), "dd-MM-yyyy");
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.warn("Por favor, insira um valor de busca.", { autoClose: 700 });
      return;
    }

    await getCompany(searchType, searchQuery, setSelectedCompany);
  };

  const handleCnpjMask = (value) => {
    const cnpj = value.replace(/\D/g, "").slice(0, 14);
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5"
    );
  };

  console.log(techs)

  return (
    <>
      <Main>
        {selectedCompany && (
          <CompanyDisplay>
            <IoArrowUndo
              className="icon"
              onClick={() => {
                setSelectedCompany(null);
                setPgrData(null);
              }}
            />{" "}
            Empresa atual: <span>{selectedCompany.nm_comp_name}</span>
          </CompanyDisplay>
        )}

        <SearchBox onSubmit={handleSearch}>
          <CompanyLabel htmlFor="search">Empresa:</CompanyLabel>
          <ChoiceBox>
            <RadioBox>
              <Radio>
                <label htmlFor="name">Nome</label>
                <input
                  type="radio"
                  id="name"
                  name="search-radio"
                  value="name"
                  checked={searchType === "name"}
                  onChange={() => {
                    setSearchType("name");
                    setSearchQuery("");
                  }}
                />
              </Radio>

              <Radio>
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="radio"
                  id="cnpj"
                  name="search-radio"
                  value="cnpj"
                  checked={searchType === "cnpj"}
                  onChange={() => {
                    setSearchType("cnpj");
                    setSearchQuery("");
                  }}
                />
              </Radio>
            </RadioBox>
            <InputBox>
              <input
                type="text"
                name="search"
                id="search"
                placeholder={`Digite o ${
                  searchType === "name" ? "nome" : "CNPJ"
                } da empresa`}
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    searchType === "cnpj"
                      ? handleCnpjMask(e.target.value)
                      : e.target.value
                  )
                }
              />
              <button type="submit">
                <span>
                  <SearchIcon />
                </span>
              </button>
            </InputBox>
          </ChoiceBox>
        </SearchBox>
        <ActionsBox>
          <ActionBtn
            type="primary"
            id="add-emp"
            onClick={() => setModal1Visible(true)}
          >
            <div>
              <MdAddCircle className="icon" />
              <span>Incluir Emp.</span>
            </div>
          </ActionBtn>
          <ActionBtn
            id="edit-emp"
            type="primary"
            onClick={() => {
              if (selectedCompany) {
                setModal2Visible(true);
              } else {
                toast.warn("Selecione uma empresa para editar.", {
                  autoClose: 1000,
                });
              }
            }}
          >
            <div>
              <MdOutlineBorderColor className="icon" /> <span>Editar Emp.</span>
            </div>
          </ActionBtn>
          <ActionBtn
            id="del-emp"
            type="primary"
            onClick={() => {
              if (selectedCompany) {
                setModal3Visible(true);
              } else {
                toast.warn("Selecione uma empresa para excluir.", {
                  autoClose: 1000,
                });
              }
            }}
          >
            <div>
              <MdDelete className="icon" />
              <span>Excluir Emp.</span>
            </div>
          </ActionBtn>
        </ActionsBox>
        <CardsBox>
          <Card>
            <HeaderCard>
              <p id="pgr">
                PGR{" "}
                {selectedCompany && (
                  <span>- Mês: {selectedCompany.ds_month_validity}</span>
                )}
              </p>
              <IconCard onClick={() => setModalPgrVisible(true)} />
            </HeaderCard>
            <BodyCard>
              {pgrData ? (
                <>
                  <ItemCard>
                    <StatusIcon>
                      <CheckIcon />
                    </StatusIcon>
                    <TextStatus>
                      Contele{" "}
                      <span>
                        {pgrData.dt_contele ? "Alimentado" : "Pendente"}
                      </span>{" "}
                      - <span>{techs.cd_id_contele_tec || "N/A"}</span> (
                      <span>{formatDateForDisplay(pgrData.dt_contele)}</span>)
                    </TextStatus>
                  </ItemCard>
                </>
              ) : (
                <TextStatus>
                  Selecione uma empresa para ver os registros de PGR
                </TextStatus>
              )}
            </BodyCard>
          </Card>
          <Card>
            <HeaderCard>
              <p id="ltcat">LTCAT</p>
              <IconCard />
            </HeaderCard>
          </Card>
          <Card>
            <HeaderCard>
              <p id="comp">COMPLEMENTOS</p>
              <IconCard />
            </HeaderCard>
          </Card>
        </CardsBox>

        <ModalAddComp
          visible={modal1Visible}
          onClose={() => setModal1Visible(false)}
        />
        <ModalEditComp
          visible={modal2Visible}
          onClose={() => setModal2Visible(false)}
          companyData={selectedCompany}
          exitCompany={setSelectedCompany}
        />
        <ModalDelComp
          visible={modal3Visible}
          onClose={() => setModal3Visible(false)}
          companyData={selectedCompany}
          exitCompany={setSelectedCompany}
        />
        <ModalEditPgr
          visible={modalPgrVisible}
          onClose={() => setModalPgrVisible(false)}
          companyId={selectedCompany?.id_company}
          updatePgrData={updatePgrData}
        />
      </Main>
    </>
  );
};

export default Home;
