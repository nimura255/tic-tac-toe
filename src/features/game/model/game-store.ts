import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { findEndgameSequence } from './helpers';
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

type SetGameStatePayloadType = {
  users: {
    circles: string;
    crosses: string;
  };
  board: BoardType;
  winner: BoardFigureType;
  endgameSequence: { row: number; column: number }[];
};

type GameStoreActionsType = {
  startGame(payload: { crosses: string; circles: string }): void;
  restart(): void;
  exitGame(): void;
  markCell(params: { row: number; column: number }): void;
  setGameState(payload: SetGameStatePayloadType): void;
};

type GameStoreType = GameStoreStateType & GameStoreActionsType;

export const useGameStore = create<GameStoreType>()(
  subscribeWithSelector((set) => ({
    users: {
      circles: 'user1',
      crosses: 'user2',
    },
    turn: 'crosses',
    board: [],
    winner: null,
    endgameSequence: null,
    startGame: ({ crosses, circles }: { crosses: string; circles: string }) => {
      set(() => ({
        users: { crosses, circles },
        turn: 'crosses',
        board: [],
        winner: null,
        endgameSequence: null,
      }));
    },
    restart: () => {
      set(({ users }) => ({
        users: users,
        turn: 'crosses',
        board: [],
        winner: null,
        endgameSequence: null,
      }));
    },
    setGameState: (payload) => {
      set((state) => ({
        ...state,
        users: payload.users,
        board: payload.board,
        endgameSequence: [...payload.endgameSequence],
      }));
    },
    exitGame: () => {
      set((state) => ({
        ...state,
        users: {
          circles: '',
          crosses: '',
        },
        turn: 'crosses',
        board: [],
        winner: null,
        endgameSequence: null,
      }));
    },
    markCell: (params: { row: number; column: number }) => {
      const { column, row } = params;

      set((state) => {
        const newBoard = [...state.board];
        const rowArray = [...(newBoard[row] || [])];
        const { turn } = state;

        if (!rowArray[column]) {
          rowArray[column] = turn;
        }

        newBoard[row] = rowArray;

        const endgameSequence = findEndgameSequence({
          row,
          column,
          board: newBoard,
        });

        return {
          ...state,
          turn: turn === 'circles' ? 'crosses' : 'circles',
          board: newBoard,
          winner: endgameSequence ? turn : null,
          endgameSequence,
        };
      });
    },
  })),
);
