import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const Container = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  border: 2px solid #000;
  padding: 4px;
  transform: translate(-50%, -50%);
`;

export const Title = styled(Typography)`
  display: flex;
  column-gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
  text-align: center;
  overflow: hidden;
  padding-bottom: 20px;
`.withComponent('h1');

export const NameSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ButtonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
