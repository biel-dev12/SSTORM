// src/pages/CreateLtcat/style.js
import styled from "styled-components";
import { theme } from "../../../Theme";

export const Container = styled.div`
  padding: 2rem 4rem;
  max-width: 800px;
  margin: 0 auto;
  font-family: "Segoe UI", sans-serif;
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${theme.colors.gray};

  span {
    font-size: 1.1rem;
    font-weight: 500;
    color: ${theme.colors.text};
  }
`;

export const BackButton = styled.button`
  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  & #home{
    transition: inherit;
  }

  &:hover {
    background-color: ${theme.colors.orangeDark};
    border: 1px solid ${theme.colors.white};
    & #home{
      transform: scale(1.5);
    }
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${({ size }) => size || 1};

  label {
    font-weight: 500;
    margin-bottom: 0.3rem;
    color: ${theme.colors.text};
  }

  input {
    padding: 0.6rem 0.8rem;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.3),
                -6px -6px 12px rgba(255, 255, 255, 0.6);
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.1),
                  inset -4px -4px 4px rgba(255, 255, 255, 0.7);
    }
  }

  input[type="date"] {
    font-family: inherit;
  }
`;


export const SubmitButton = styled.button`
  background-color: ${theme.colors.orange};
  color: ${theme.colors.white};
  font-size: 1rem;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: background 0.3s ease;
  margin-top: .8rem;

  &:hover {
    background-color: ${theme.colors.orangeDark};
  }
`;
