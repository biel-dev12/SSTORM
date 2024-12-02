import { theme } from "../../../Theme";
import styled from "styled-components";

export const Form = styled.form`
    width: 100%;
    margin-top: .5rem;
    border-top: 1px solid ${theme.colors.black};
    padding-top: 1rem;
    font-family: Kadwa;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const InputBox = styled.div`
    display: flex;
    gap: .6rem;
    align-items: center;
`

export const Label = styled.label`
    font-weight: bold;
    cursor: pointer;
` 

export const Input = styled.input`
    width: 70%;
    border-radius: 5px;
    outline: none;
    border: 1px solid;
    padding: 2px 5px;

    &#cnpj{
        width: 30%;
    }
`