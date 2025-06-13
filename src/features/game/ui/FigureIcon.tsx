import styled from '@emotion/styled';
import { CircleIcon } from '$shared/ui/circleIcon.tsx';
import { CrossIcon } from '$shared/ui/crossIcon.tsx';

export const RedCircleIcon = styled(CircleIcon)`
  color: red;
`;

export const BlueCrossIcon = styled(CrossIcon)`
  color: blue;
`;

export function FigureIcon({ type }: { type: 'circles' | 'crosses' }) {
  switch (type) {
    case 'circles':
      return <RedCircleIcon />;
    case 'crosses':
      return <BlueCrossIcon />;
    default:
      return null;
  }
}
