import styled from '@emotion/styled';
import { CircleIcon } from '$shared/ui/CircleIcon';
import { CrossIcon } from '$shared/ui/CrossIcon';
import type { BoardFigureType } from '$entities/boardFigure';

export const RedCircleIcon = styled(CircleIcon)`
  color: red;
`;

export const BlueCrossIcon = styled(CrossIcon)`
  color: blue;
`;

export function FigureIcon({ type }: { type: BoardFigureType }) {
  switch (type) {
    case 'circles':
      return <RedCircleIcon />;
    case 'crosses':
      return <BlueCrossIcon />;
    default:
      return null;
  }
}
