import { create } from 'zustand';

type ScreenType = 'home' | 'start-pvp' | 'game' | 'history' | 'game-review';

type ScreenStoreStateType = {
  screen: ScreenType;
};

type ScreenStoreActionsType = {
  setScreen(newScreen: ScreenType): void;
};

type ScreenStoreType = ScreenStoreStateType & ScreenStoreActionsType;

export const useScreenStore = create<ScreenStoreType>((set) => ({
  screen: 'home',
  setScreen: (screen: ScreenType) => {
    set(() => ({
      screen,
    }));
  },
}));
