export type ScreenType =
  | 'home'
  | 'start-pvp'
  | 'game'
  | 'history'
  | 'game-review';

export type RouterContextType = {
  screen: ScreenType;
  setScreen(newScreen: ScreenType): void;
};
