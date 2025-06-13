import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-items: start;
  padding-bottom: 20px;
`;

export const Title = styled(Typography)`
  justify-self: center;
  text-align: center;
  font-weight: 500;
`.withComponent('h1');
