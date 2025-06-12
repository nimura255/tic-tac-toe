export type ScreenType = 'home' | 'game' | 'history' | 'game-review';

export type RouterContextType = {
  screen: ScreenType;
  setScreen(newScreen: ScreenType): void;
};
