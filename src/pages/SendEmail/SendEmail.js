import styled from "styled-components";
import { theme } from "../../Theme";
import { IoMdCloseCircle } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding: 20px;
`;

export const Form = styled.div`
  background-color: ${theme.colors.background};
  padding: 10px 20px 20px 20px;
  border-radius: 8px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

export const Models = styled.div`
  background-color: ${theme.colors.background};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: ${theme.colors.green};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 2px;

  & .dest {
    display: flex;
    align-items: center;
  }
`;

export const Label = styled.label``;

export const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

export const RemoveDest = styled(IoMdCloseCircle)`
  font-size: 2rem;
  margin: 0 0 10px 5px;
  cursor: pointer;
  color: ${theme.colors.error};
`;

export const AddDest = styled(IoMdAddCircle)`
  font-size: 2rem;
  margin: 0 0 10px 5px;
  cursor: pointer;
  color: ${theme.colors.green};
  margin: 0 auto; 
`;
