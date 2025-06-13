import ArrowBack from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { useShallow } from 'zustand/react/shallow';

import { useGameStore, exitGame } from '$features/game';
import { useScreenStore } from '$shared/lib/router';
import { Container, DividingText, NameSpan, TitleContainer } from './styled';

export function Header() {
  const usersNames = useGameStore(useShallow((state) => state.users));

  return (
    <Container>
      <IconButton aria-label="Go back" onClick={goToHistory}>
        <ArrowBack color="primary" />
      </IconButton>
      <TitleContainer variant="h5">
        <NameSpan $kind="circles">{usersNames.circles}</NameSpan>
        <DividingText>vs</DividingText>
        <NameSpan $kind="crosses">{usersNames.crosses}</NameSpan>
      </TitleContainer>
    </Container>
  );
}

function goToHistory() {
  exitGame();
  useScreenStore.getState().setScreen('history');
}
