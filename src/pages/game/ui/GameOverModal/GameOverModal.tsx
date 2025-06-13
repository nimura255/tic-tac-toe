import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useShallow } from 'zustand/react/shallow';

import { restartGame, markGameEnd, useGameStore } from '$features/game';
import { goToHomeScreen } from '../../lib/goToHomeScreen';
import { ButtonsList, Container, NameSpan, Title } from './styled';

export function GameOverModal() {
  const [isOpen, setIsOpen] = useState(false);

  const usersNames = useGameStore(useShallow((state) => state.users));
  const winner = useGameStore(useShallow((state) => state.winner));

  useEffect(() => {
    const unsubscribeFromGameOverAction = markGameEnd.subscribe(() => {
      setIsOpen(true);
    });
    const unsubscribeFromGameStartAction = restartGame.subscribe(() => {
      setIsOpen(false);
    });

    return () => {
      unsubscribeFromGameOverAction();
      unsubscribeFromGameStartAction();
    };
  }, []);

  return (
    <Modal open={isOpen}>
      <Container sx={{ bgcolor: 'background.paper', boxShadow: 24 }}>
        <Title variant="h6">
          <NameSpan>{usersNames[winner!]}</NameSpan>
          won
        </Title>

        <ButtonsList>
          <Button onClick={restartGame} variant="contained">
            Restart
          </Button>
          <Button onClick={goToHomeScreen} variant="contained">
            Exit
          </Button>
        </ButtonsList>
      </Container>
    </Modal>
  );
}
