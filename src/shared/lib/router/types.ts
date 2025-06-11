export type ScreenType = 'home' | 'game' | 'history';

export type RouterContextType = {
  screen: ScreenType;
  setScreen(newScreen: ScreenType): void;
};
