import styled from "styled-components";
import { theme } from "../../Theme";
import imgBg from "../../assets/doctors-svg.svg";

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
    opacity: .2;
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
`;

export const Btn = styled.button``;
