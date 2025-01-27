import { useState } from "react";
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
  PendingIcon,
  CompanyDisplay,
} from "./style";
import { MdAddCircle, MdDelete, MdOutlineBorderColor } from "react-icons/md";
import { IoArrowUndo } from "react-icons/io5";
import { Dropdown } from "antd";
import ModalAddComp from "../../components/Modals/Home/ModalAddComp/ModalAddComp";
import ModalEditComp from "../../components/Modals/Home/ModalEditComp/ModalEditComp";
import ModalDelComp from "../../components/Modals/Home/ModalDelComp/ModalDelComp";
import { getCompany } from "../../api/companyService";
import { toast } from "react-toastify";

const Home = () => {
  const [modal1Visible, setModal1Visible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const items = [
    {
      key: "1",
      label: "1st item",
    },
    {
      key: "2",
      label: "2nd item",
    },
    {
      key: "3",
      label: "3rd item",
    },
  ];

  return (
    <>
      <Main>
        {selectedCompany && (
          <CompanyDisplay>
            <IoArrowUndo
              className="icon"
              onClick={() => setSelectedCompany(null)}
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
              <p id="pgr">PGR/PCMSO</p>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <IconCard />
              </Dropdown>
            </HeaderCard>
            <BodyCard>
              <ItemCard>
                <StatusIcon>
                  <CheckIcon />
                </StatusIcon>
                <TextStatus>
                  Contele <span id="statusContele">Alimentado</span> -{" "}
                  <span id="tec">Beatriz</span> (
                  <span id="date">29/11/2024</span>)
                </TextStatus>
              </ItemCard>
              <ItemCard>
                <StatusIcon>
                  <CheckIcon />
                </StatusIcon>
                <TextStatus>
                  SOC+DOC Básico <span id="statusDocBasic">Realizado</span> -{" "}
                  <span id="tec">Ricardo</span> (
                  <span id="date">29/11/2024</span>)
                </TextStatus>
              </ItemCard>
              <ItemCard>
                <StatusIcon>
                  <PendingIcon />
                </StatusIcon>
                <TextStatus>
                  Inspeção <span id="statusInsp">Realizada</span> -{" "}
                  <span id="tec">Marcos</span> (
                  <span id="date">29/11/2024</span>)
                </TextStatus>
              </ItemCard>
              <ItemCard>
                <StatusIcon>
                  <PendingIcon />
                </StatusIcon>
                <TextStatus>
                  SOC+DOC Definitivo <span id="statusDocDef">Realizado</span> -{" "}
                  <span id="tec">Ricardo</span> (
                  <span id="date">29/11/2024</span>)
                </TextStatus>
              </ItemCard>
              <ItemCard>
                <StatusIcon>
                  <PendingIcon />
                </StatusIcon>
                <TextStatus>
                  Assinatura e Envio <span id="statusEnv">Realizado</span> -{" "}
                  <span id="tec">Ricardo</span> (
                  <span id="date">29/11/2024</span>)
                </TextStatus>
              </ItemCard>
            </BodyCard>
          </Card>
          <Card>
            <HeaderCard>
              <p id="ltcat">LTCAT</p>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <IconCard />
              </Dropdown>
            </HeaderCard>
          </Card>
          <Card>
            <HeaderCard>
              <p id="comp">COMPLEMENTOS</p>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <IconCard />
              </Dropdown>
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
      </Main>
    </>
  );
};

export default Home;
