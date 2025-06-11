import { useState, useCallback, type FormEvent } from 'react';
import { useRouterState } from '$shared/lib/router';
import { useGameStore } from '$features/game';
import { useShallow } from 'zustand/react/shallow';

export function useHomePageForm() {
  const [crossesUserName, setCrossesUserName] = useState('');
  const [crossesUserNameError, setCrossesUserNameError] = useState('');
  const [circlesUserName, setCirclesUserName] = useState('');
  const [circlesUserNameError, setCirclesUserNameError] = useState('');

  const { setScreen } = useRouterState();
  const setNamesToStore = useGameStore(useShallow((state) => state.setNames));

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
        setNamesToStore({
          crosses: trimmedCrosses,
          circles: trimmedCircles,
        });
        setScreen('game');
      }
    },
    [circlesUserName, crossesUserName, setNamesToStore, setScreen],
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
