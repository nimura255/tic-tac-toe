import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { BoardFigureType, BoardType } from './types';

type GameStoreStateType = {
  users: {
    circles: string;
    crosses: string;
  };
  turn: BoardFigureType;
  board: BoardType;
  winner: BoardFigureType | null;
  endgameSequence: { row: number; column: number }[] | null;
};

export const useGameStore = create<GameStoreStateType>()(
  subscribeWithSelector(
    () =>
      ({
        users: {
          circles: 'user1',
          crosses: 'user2',
        },
        turn: 'crosses',
        board: [],
        winner: null,
        endgameSequence: null,
      }) as GameStoreStateType,
  ),
);
