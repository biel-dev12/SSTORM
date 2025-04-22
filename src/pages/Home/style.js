import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { MdEditNote, MdCheckCircle, MdAccessTimeFilled } from "react-icons/md";

import { theme } from "../../Theme";

export const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: K2D;
  text-align: left;
  font-size: ${theme.fonts.xsmall};
  margin: 0.3rem 0;
  letter-spacing: 1px;
  position: absolute;
`;

export const Main = styled.main`
  width: 100%;
  height: auto;
  font-family: Kadwa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

//Estilzação do form de buscar empresa

export const SearchBox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: ${theme.fonts.xsmall};
`;

export const CompanyLabel = styled.label`
  font-weight: bold;
  margin: 0 1rem 3px 0;
  align-self: flex-end;
  cursor: pointer;
  text-decoration: underline;
`;

export const ChoiceBox = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-direction: column;
`;

export const RadioBox = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Radio = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  gap: 0.3rem;

  input,
  label {
    cursor: pointer;
    margin: 0px;
  }

  input {
    accent-color: ${theme.colors.blue};
  }
`;

export const InputBox = styled.div`
  background-color: ${theme.colors.white};
  display: flex;
  height: 1.8rem;
  width: 20rem;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid ${theme.colors.blue};

  input,
  button {
    border: none;
    outline: none;
    background: none;
  }

  input {
    width: 95%;
    padding: 0 0.5rem;
  }

  button {
    width: 10%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0px;
    transition: all 0.3s;
    outline: none;
    color: ${theme.colors.orange};
    span {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.blue};
    }
  }
`;

export const SearchIcon = styled(IoSearch)`
  font-size: ${theme.fonts.medium};
`;

//Estilzação dos botões de ação

export const ActionsBox = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (min-width: 769px) {
    gap: 3rem;
  }
`;

export const ActionBtn = styled.button`
  width: 9rem;
  height: 2rem;
  padding: 0 !important;
  background-color: ${theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.25);
  outline: none !important;
  transition: all 0.3s;
  border: none;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${theme.fonts.medium};
    gap: 5px;
    color: ${theme.colors.text};

    span {
      font-size: ${theme.fonts.xsmall};
    }
  }

  &.green {
    .icon {
      color: ${theme.colors.green};
    }
  }

  &.blue {
    .icon {
      color: ${theme.colors.blue};
    }
  }

  &.orange {
    .icon {
      color: ${theme.colors.orange};
    }
  }

  &:hover {
    div {
      color: ${theme.colors.white};
    }

    &.green {
      background-color: ${theme.colors.green};
      .icon {
        color: ${theme.colors.white};
      }
    }

    &.blue {
      background-color: ${theme.colors.blue};
      .icon {
        color: ${theme.colors.white};
      }
    }

    &.orange {
      background-color: ${theme.colors.orange};
      .icon {
        color: ${theme.colors.white};
      }
    }
  }
`;

//Estilização dos cards de Gestão
export const CardsBox = styled.section`
  margin-top: 0.5rem;
  width: 100%;
  height: 50vh;
  padding: 0.5rem 1rem;
  display: grid;
  grid-template-columns: 30rem 30rem;
  grid-template-rows: 1fr 1fr;
  gap: 1rem 3rem;
  grid-template-areas:
    ". ."
    ". .";
  justify-content: center;
  align-items: center;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
    grid-template-areas:
      "."
      "."
      ".";
    justify-items: center;
  }
`;

export const Card = styled.div`
  width: 30rem;
  height: 12.5rem;
  background-color: ${theme.colors.background};
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 5px 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const HeaderCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.fonts.medium};
  border-bottom: 1px solid ${theme.colors.text};
  font-family: K2D;
  font-weight: bold;

  p {
    transition: all .5s;
    margin: 0;
    font-size: ${theme.fonts.medium};
    &#pgr {
      color: ${theme.colors.green};
    }
    &#ltcat {
      color: ${theme.colors.orange};
    }
    &#comp {
      color: ${theme.colors.blue};
    }

    @media (max-width: 768px) {
      font-size: 0.95rem;
  }
`;

export const IconCard = styled(MdEditNote)`
  font-size: ${theme.fonts.large};
  cursor: pointer;
`;

export const BodyCard = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(133, 178, 220, 0.5);
  margin: 0.3rem 0;
  border-radius: 8px;
  padding: 0.8rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
`;

export const ItemCard = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
`;

export const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: ${theme.fonts.medium};
`;

export const TextStatus = styled.div`
  font-size: ${theme.fonts.xsmall};
  font-weight: bold;
  color: ${theme.colors.text};
`;

export const CheckIcon = styled(MdCheckCircle)`
  color: ${theme.colors.green};
`;

export const PendingIcon = styled(MdAccessTimeFilled)`
  color: ${theme.colors.orange};
`;

export const Drop = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 200px;
  display: block;
  margin-top: 8px;

  @media (max-width: 768px) {
    width: 150px; /* Ajuste conforme o tamanho da tela */
  }
`;

export const CompanyDisplay = styled.div`
  position: absolute;
  top: 15px;
  right: 30px;
  padding: 10px 15px;
  background: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  font-weight: bold;
  color: ${theme.colors.text};
  transition: all 0.3s ease-in-out;

  display: flex;
  align-items: center;
  gap: 5px;

  .icon {
    margin-right: 0.5rem;
    font-size: 1.2rem;
    color: ${theme.colors.orange};
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 3px;

    &:hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.orange};
    }
  }

  span {
    color: ${theme.colors.blue};
  }
`;
