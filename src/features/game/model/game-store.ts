import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export type BoardFigureType = 'crosses' | 'circles';
type BoardType = BoardFigureType[][];

type GameStoreStateType = {
  users: {
    circles: string;
    crosses: string;
  };
  turn: BoardFigureType;
  board: BoardType;
  winner: BoardFigureType | null;
};

type SetGameStatePayloadType = {
  users: {
    circles: string;
    crosses: string;
  };
  board: BoardType;
};

type GameStoreActionsType = {
  startGame(payload: { crosses: string; circles: string }): void;
  restart(): void;
  exitGame(): void;
  markCell(params: { row: number; column: number }): void;
  setGameState(payload: SetGameStatePayloadType): void;
};

type GameStoreType = GameStoreStateType & GameStoreActionsType;

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
  board: BoardType;
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

export const useGameStore = create<GameStoreType>()(
  subscribeWithSelector((set) => ({
    users: {
      circles: 'user1',
      crosses: 'user2',
    },
    turn: 'crosses',
    board: [],
    winner: null,
    startGame: ({ crosses, circles }: { crosses: string; circles: string }) => {
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
    setGameState: (payload) => {
      set((state) => ({
        ...state,
        users: payload.users,
        board: payload.board,
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

        const isGameOver = findEndgameSequence({
          row,
          column,
          board: newBoard,
        });

        return {
          ...state,
          turn: turn === 'circles' ? 'crosses' : 'circles',
          board: newBoard,
          winner: isGameOver ? turn : null,
        };
      });
    },
  })),
);
