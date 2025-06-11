import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type GameStoreState = {
  users: {
    circles: string;
    crosses: string;
  };
  turn: 'crosses' | 'circles';
  board: ('crosses' | 'circles')[][];
};

export const useGameStore = create(
  combine(
    {
      users: {
        circles: 'user1',
        crosses: 'user2',
      },
      turn: 'crosses',
      board: [],
    } as GameStoreState,
    (set) => ({
      setNames: ({
        crosses,
        circles,
      }: {
        crosses: string;
        circles: string;
      }) => {
        set({
          users: { crosses, circles },
        });
      },
      markCell: (params: { row: number; column: number }) => {
        const { column, row } = params;

        set((state) => {
          const newBoard = [...state.board];
          const rowArray = [...(newBoard[row] || [])];
          const { turn } = state;

          rowArray[column] = turn;
          newBoard[row] = rowArray;

          return {
            ...state,
            turn: turn === 'circles' ? 'crosses' : 'circles',
            board: newBoard,
          };
        });
      },
    }),
  ),
);
