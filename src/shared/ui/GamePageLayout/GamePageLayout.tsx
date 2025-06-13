import type { ReactNode } from 'react';
import { BoardWrapper, Container } from './styled.ts';

type PropsType = {
  header: ReactNode;
  board: ReactNode;
};

export function GamePageLayout({ header, board }: PropsType) {
  return (
    <Container>
      {header}
      <BoardWrapper>{board}</BoardWrapper>
    </Container>
  );
}
