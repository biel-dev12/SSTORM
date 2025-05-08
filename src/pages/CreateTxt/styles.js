import styled from "styled-components";
import { theme } from "../../Theme";

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

export const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: transparent;
  justify-content: center;
  // gap: ;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
  resize: vertical;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 0.9rem;
  border: 1px solid ${theme.colors.gray};
  border-radius: 8px;
`;

export const Label = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${theme.colors.text};
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const InfoItem = styled.div`
  font-size: 1rem;
  // margin-bottom: 10px;
  text-align: left;

  pre {
    margin: 0;
    padding: 0;
    white-space: pre-line;
    text-align: left;
    display: block;
  }
`;

export const Orange = styled.span`
  color: ${theme.colors.orange};
  font-weight: 600;
`;

export const LeftContainer = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 50%;
  padding-right: 2rem;
  border-right: 1px solid ${theme.colors.black};
`;

export const RightContainer = styled.aside`
  width: 50%;
  padding-left: 2rem;
`;

export const CopyButton = styled.button`
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e65c00;
  }
`;
