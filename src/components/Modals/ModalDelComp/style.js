import { theme } from "../../../Theme";
import styled from "styled-components";

export const ConfirmDel = styled.div`
    display: flex;
    gap: 10px;

    input{
        outline: none;
        border-radius: 5px;
        border: 2px solid ${theme.colors.error};
    }
`