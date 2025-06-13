import styled from '@emotion/styled';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import type { BoardFigureType } from '$entities/boardFigure';

export const ListItemContainer = styled(ListItem)`
  justify-content: space-between;
  gap: 20px;
`;

export const TextContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
`;

export const TitleContainer = styled(Typography)`
  display: flex;
  gap: 5px;
  width: 100%;
  overflow: hidden;
  font-weight: bold;
`;

export const NameSpan = styled.span<{ $kind: BoardFigureType }>`
  overflow: hidden;
  text-overflow: ellipsis;

  color: ${({ $kind }) => ($kind === 'crosses' ? '#000096' : '#b30000')};
`;

export const DividingText = styled.span`
  flex-shrink: 0;
`;

export const WinnerText = styled(Typography)`
  display: flex;
  gap: 5px;
  width: 100%;
  overflow: hidden;
`;
