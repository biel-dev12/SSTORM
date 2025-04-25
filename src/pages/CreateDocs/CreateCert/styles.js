import styled, { keyframes } from "styled-components";
import { theme } from "../../../Theme";
import { MdDelete } from "react-icons/md";

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
  margin-bottom: 1rem;
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

  & #home {
    transition: inherit;
  }

  &:hover {
    background-color: ${theme.colors.orangeDark};
    border: 1px solid ${theme.colors.white};
    & #home {
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
  align-self: center;
  transition: background 0.3s ease;
  margin-top: 0.8rem;

  &:hover {
    background-color: ${theme.colors.orangeDark};
  }
`;

export const TitleForm = styled.h3`
  margin: 0;
`;

export const Fieldset = styled.fieldset`
  border: 1px solid ${theme.colors.gray300};
  border-radius: 12px;
  padding: 16px 24px;
  margin-top: 24px;
  background-color: ${theme.colors.gray50};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const LegendForm = styled.legend`
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0 12px;
  margin-left: 12px;
  color: ${theme.colors.primary};
  background-color: ${theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.3);
`;

export const FieldGroupWrapper = styled.div`
  margin-top: 12px;
  margin-bottom: 20px;
  padding: 12px;
  border-left: 4px solid ${theme.colors.primary};
  background-color: ${theme.colors.white};
  border-radius: 8px;
`;


export const AddBtn = styled.button`
  background-color: ${theme.colors.green};
  color: ${theme.colors.white};
  font-size: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;

  &.cargo {
    margin: 15px;
  }

  &:hover {
    background-color: ${theme.colors.blue};
  }
`;

export const DeleteBtn = styled(MdDelete)`
  color: ${theme.colors.error};
  font-size: 2rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const ToggleModeButton = styled.button`
  background-color: ${theme.colors.gray};
  border: 1px solid #ccc;
  padding: 0.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid ${theme.colors.gray};
  border-radius: 6px;
  font-size: 1rem;
  resize: vertical;
`;

export const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

export const LoaderText = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoaderSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${theme.colors.orange};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${rotate} 1s linear infinite;
`;


