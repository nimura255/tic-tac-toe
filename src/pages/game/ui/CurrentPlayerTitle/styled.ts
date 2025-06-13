import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

export const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-self: center;
  align-items: flex-start;
  max-width: 100%;
  overflow: hidden;

  & > svg {
    flex-shrink: 0;
    width: 24px;
    padding-top: 5px;
  }
`;

export const Title = styled(Typography)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 5px;
  width: 100%;
  overflow: hidden;
  text-align: center;
`;

export const NameSpanWrapper = styled.span`
  display: flex;
  overflow: hidden;
`;

export const NameSpan = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NamePostfixSpan = styled.span`
  flex-shrink: 0;
`;
