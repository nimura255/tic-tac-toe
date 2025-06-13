import { exitGame } from '$features/game';
import { useScreenStore } from '$shared/lib/router';

export function goToHomeScreen() {
  exitGame();
  useScreenStore.getState().setScreen('home');
}
