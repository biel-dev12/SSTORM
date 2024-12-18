import styled from "styled-components";

export const Container = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 800px;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
`;

export const MonthSelector = styled.select`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &:hover {
    border-color: #888;
  }
`;
