import styled from "styled-components";

export const DashboardWrapper = styled.div`
  padding: 16px;
  background: #fdfdfd;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ChartsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-around;
`;

export const ChartBox = styled.div`
  width: 280px;
  height: auto;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 0 4px rgba(0,0,0,0.05);
`;

export const KPIRow = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const KPIBox = styled.div`
  background-color: #fafafa;
  padding: 16px 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-weight: 600;
  font-size: 1rem;
  color: #333;
  min-width: 140px;
`;
