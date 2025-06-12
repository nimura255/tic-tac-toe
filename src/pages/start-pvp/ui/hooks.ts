import { useState, useCallback, type FormEvent } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '$features/game';
import { useScreenStore } from '$shared/lib/router';

export function useStartPvpPageForm() {
  const [crossesUserName, setCrossesUserName] = useState('');
  const [crossesUserNameError, setCrossesUserNameError] = useState('');
  const [circlesUserName, setCirclesUserName] = useState('');
  const [circlesUserNameError, setCirclesUserNameError] = useState('');

  const setScreen = useScreenStore(useShallow((state) => state.setScreen));
  const startGame = useGameStore(useShallow((state) => state.startGame));

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const emptyFieldError = 'Please fill';
      const trimmedCrosses = crossesUserName.trim();
      const trimmedCircles = circlesUserName.trim();

      if (!trimmedCrosses) {
        setCrossesUserNameError(emptyFieldError);
      }

      if (!trimmedCircles) {
        setCirclesUserNameError(emptyFieldError);
      }

      if (circlesUserName.trim() && crossesUserName.trim()) {
        startGame({
          crosses: trimmedCrosses,
          circles: trimmedCircles,
        });
        setScreen('game');
      }
    },
    [circlesUserName, crossesUserName, startGame, setScreen],
  );

  return {
    crossesUserName,
    setCrossesUserName,
    crossesUserNameError,
    circlesUserName,
    setCirclesUserName,
    circlesUserNameError,
    handleSubmit,
  };
}
