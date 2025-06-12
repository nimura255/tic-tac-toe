import { create } from 'zustand';
import { combine } from 'zustand/middleware';

type GameStoreState = {
  users: {
    circles: string;
    crosses: string;
  };
  turn: 'crosses' | 'circles';
  board: ('crosses' | 'circles')[][];
  winner: 'crosses' | 'circles' | null;
};

const possibleIntervals = [
  {
    fromRow: -4,
    toRow: 0,
    fromCol: 0,
    toCol: 0,
  },
  {
    fromRow: 0,
    toRow: 4,
    fromCol: 0,
    toCol: 0,
  },
  {
    fromRow: 0,
    toRow: 0,
    fromCol: -4,
    toCol: 0,
  },
  {
    fromRow: 0,
    toRow: 0,
    fromCol: 0,
    toCol: 4,
  },
  {
    fromRow: -4,
    toRow: 0,
    fromCol: -4,
    toCol: 0,
  },
  {
    fromRow: 0,
    toRow: 4,
    fromCol: 0,
    toCol: 4,
  },

  {
    fromRow: 4,
    toRow: 0,
    fromCol: -4,
    toCol: 0,
  },
  {
    fromRow: 0,
    toRow: -4,
    fromCol: 0,
    toCol: 4,
  },
];

function selectIncrement(from: number, to: number) {
  if (from < to) {
    return 1;
  }

  if (from > to) {
    return -1;
  }

  return 0;
}

function checkIntervalCondition(from: number, to: number, current: number) {
  if (from < to) {
    return current <= to;
  }

  if (from > to) {
    return current >= to;
  }

  return current === to;
}

function findEndgameSequence(params: {
  row: number;
  column: number;
  board: ('crosses' | 'circles')[][];
}): boolean {
  const { row, board, column } = params;
  const kind = board[row]?.[column];

  for (const interval of possibleIntervals) {
    const firstRow = interval.fromRow + row;
    const firstColumn = interval.fromCol + column;
    const lastRow = interval.toRow + row;
    const lastColumn = interval.toCol + column;

    let currentRow = firstRow;
    let currentColumn = firstColumn;

    const rowIncrement = selectIncrement(interval.fromRow, interval.toRow);
    const colIncrement = selectIncrement(interval.fromCol, interval.toCol);

    let cellsCounter = 0;

    while (
      checkIntervalCondition(firstRow, lastRow, currentRow) &&
      checkIntervalCondition(firstColumn, lastColumn, currentColumn)
    ) {
      const cell = board[currentRow]?.[currentColumn];

      if (cell !== kind) {
        break;
      }

      cellsCounter++;
      currentRow += rowIncrement;
      currentColumn += colIncrement;
    }

    if (cellsCounter === 5) {
      return true;
    }
  }

  return false;
}

export const useGameStore = create(
  combine(
    {
      users: {
        circles: 'user1',
        crosses: 'user2',
      },
      turn: 'crosses',
      board: [],
      winner: null,
    } as GameStoreState,
    (set) => ({
      startGame: ({
        crosses,
        circles,
      }: {
        crosses: string;
        circles: string;
      }) => {
        set(() => ({
          users: { crosses, circles },
          turn: 'crosses',
          board: [],
          winner: null,
        }));
      },
      restart: () => {
        set(({ users }) => ({
          users: users,
          turn: 'crosses',
          board: [],
          winner: null,
        }));
      },
      markCell: (params: { row: number; column: number }) => {
        const { column, row } = params;

        set((state) => {
          const newBoard = [...state.board];
          const rowArray = [...(newBoard[row] || [])];
          const { turn } = state;

          rowArray[column] = turn;
          newBoard[row] = rowArray;

          const isGameOver = findEndgameSequence({
            row,
            column,
            board: newBoard,
          });

          return {
            ...state,
            turn: turn === 'circles' ? 'crosses' : 'circles',
            board: newBoard,
            winner: isGameOver ? turn : undefined,
          };
        });
      },
    }),
  ),
);
