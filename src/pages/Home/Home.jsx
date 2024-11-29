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
} from "./style";
import { MdAddCircle, MdDelete, MdOutlineBorderColor } from "react-icons/md";
import { Dropdown, Modal } from "antd";

const Home = () => {
  const [modal1Open, setModal1Open] = useState(false);

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
        <SearchBox>
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
                  checked
                />
              </Radio>

              <Radio>
                <label htmlFor="cnpj">CNPJ</label>
                <input
                  type="radio"
                  id="cnpj"
                  name="search-radio"
                  value="cnpj"
                />
              </Radio>
            </RadioBox>
            <InputBox>
              <input type="text" name="search" id="search" />
              <button>
                <span>
                  <SearchIcon />
                </span>
              </button>
            </InputBox>
          </ChoiceBox>
        </SearchBox>
        <ActionsBox>
          <ActionBtn type="primary" id="add-emp" onClick={() => setModal1Open(true)}>
          <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
            <div>
              <MdAddCircle className="icon" />
              <span>Incluir Emp.</span>
            </div>
          </ActionBtn>
          <ActionBtn id="edit-emp">
            <div>
              <MdOutlineBorderColor className="icon" /> <span>Editar Emp.</span>
            </div>
          </ActionBtn>
          <ActionBtn id="del-emp">
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
      </Main>
    </>
  );
};

export default Home;
