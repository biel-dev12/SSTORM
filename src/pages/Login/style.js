import styled from "styled-components";
import { theme } from "../../Theme.jsx";
import imgBg from "../../../public/assets/doctors-svg.svg";

export const Main = styled.main`
  font-family: Kadwa, sans-serif, Arial;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url(${imgBg});
    background-repeat: no-repeat;
    background-position: center;
    background-size: 30%;
    opacity: 0.15;
  }
`;

export const Form = styled.form`
  width: 50%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  z-index: 1;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${theme.colors.blue};
  letter-spacing: 1px;
`;

export const InputsDiv = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  label{
    margin-bottom: .3rem;
    text-decoration: underline;
    font-size: .9rem;
    font-weight: 600;
    color: ${theme.colors.text};
    letter-spacing: 1px;
  }

  input {
    width: 16rem;
    background-color: ${theme.colors.white};
    color: ${theme.colors.text};
    border: 1px solid ${theme.colors.green};
    padding: .3rem .5rem;
    border-radius: 8px;
    outline: none;

    &:focus{
    border-color: ${theme.colors.blue};
    }
  }
`;

export const Btn = styled.button`
  width: 7rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.white};
  background-color: ${theme.colors.green};
  border: 1px solid ${theme.colors.green};
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.blue};
    border: none;
  }
`;

export const Option = styled.h3`
  margin-top: 2rem;
  font-weight: 600;
  color: ${theme.colors.orange};

  span {
    font-weight: 600;
    color: ${theme.colors.green};
    text-decoration: underline;

    &:hover {
      opacity: 0.8;
    }
  }
`;
