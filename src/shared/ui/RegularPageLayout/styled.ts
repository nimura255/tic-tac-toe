import styled from '@emotion/styled';
import Card from '@mui/material/Card';

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: #ecebeb;
`;

export const ContentContainer = styled(Card)`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
  max-height: 100%;
  padding: 20px;
  box-sizing: border-box;
`;
