import { theme } from "../../../Theme";
import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  font-family: sans-serif;
`;

export const FileInput = styled.input`
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: ${theme.colors.green};
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const ResultLink = styled.a`
  display: block;
  margin-top: 1rem;
`;