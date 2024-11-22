import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import { theme } from "../../Theme";

export const Title = styled.h1`
  color: ${theme.colors.text};
  font-family: K2D;
  text-align: left;
  font-size: ${theme.fonts.xsmall};
  margin: 0.3rem 0;
  letter-spacing: 1px;
`;

export const Main = styled.main`
  width: 100%;
  height: auto;
  font-family: Kadwa;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  gap: 3rem;
  margin-top: 1.5rem;
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
  outline: none;
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

  &#add-emp {
    .icon {
      color: ${theme.colors.green};
    }
  }

  &#edit-emp {
    .icon {
      color: ${theme.colors.blue};
    }
  }

  &#del-emp {
    .icon {
      color: ${theme.colors.orange};
    }
  }

  &:hover {
    div {
      color: ${theme.colors.white};
    }

    &#add-emp {
      background-color: ${theme.colors.green};
      .icon {
        color: ${theme.colors.white};
      }
    }

    &#edit-emp {
      background-color: ${theme.colors.blue};
      .icon {
        color: ${theme.colors.white};
      }
    }

    &#del-emp {
      background-color: ${theme.colors.orange};
      .icon {
        color: ${theme.colors.white};
      }
    }
  }
`;


//Estilização dos cards de Gestão