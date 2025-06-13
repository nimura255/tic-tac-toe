import { useShallow } from 'zustand/react/shallow';
import { FigureIcon, useGameStore } from '$features/game';
import {
  Container,
  Title,
  NameSpanWrapper,
  NameSpan,
  NamePostfixSpan,
} from './styled';

export function CurrentPlayerTitle() {
  const usersNames = useGameStore(useShallow((state) => state.users));
  const turn = useGameStore(useShallow((state) => state.turn));

  return (
    <Container>
      <FigureIcon type={turn} />
      <Title variant="h5">
        <NameSpanWrapper>
          <NameSpan>{usersNames[turn]}</NameSpan>
          <NamePostfixSpan>'s</NamePostfixSpan>
        </NameSpanWrapper>
        turn
      </Title>
    </Container>
  );
}
