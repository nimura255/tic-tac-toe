import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import type { BoardFigureType } from '$entities/boardFigure';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-items: start;
  padding-top: 15px;
  padding-inline: 15px;
`;

export const TitleContainer = styled(Typography)`
  display: flex;
  gap: 5px;
  justify-self: center;
  width: 100%;
  overflow: hidden;
`;

export const NameSpan = styled.span<{ $kind: BoardFigureType }>`
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ $kind }) => ($kind === 'crosses' ? '#000096' : '#b30000')};
`;

export const DividingText = styled.span`
  flex-shrink: 0;
`;
