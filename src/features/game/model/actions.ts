import type { BoardFigureType, BoardType } from '$entities/boardFigure';
import { useGameStore } from '$features/game';
import { createSubscribableAction } from '$shared/lib/createSubscribableAction';
import { findEndgameSequence } from './helpers.ts';

type StartGamePayloadType = {
  crosses: string;
  circles: string;
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

type MarkCellPayloadType = {
  row: number;
  column: number;
};

type MarkGameEndPayloadType = {
  winner: BoardFigureType;
  endgameSequence: { row: number; column: number }[];
};

export const startGame = createSubscribableAction(
  (payload: StartGamePayloadType) => {
    useGameStore.setState({
      users: payload,
      turn: 'crosses',
      board: [],
      winner: null,
      endgameSequence: null,
    });
  },
);

export const restartGame = createSubscribableAction(() => {
  startGame(useGameStore.getState().users);
});

export const setGameState = createSubscribableAction(
  (payload: SetGameStatePayloadType) => {
    useGameStore.setState((state) => ({
      ...state,
      users: payload.users,
      board: payload.board,
      endgameSequence: [...payload.endgameSequence],
    }));
  },
);

export const exitGame = createSubscribableAction(() => {
  useGameStore.setState((state) => ({
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
});

export const markGameEnd = createSubscribableAction(
  (payload: MarkGameEndPayloadType) => {
    useGameStore.setState((state) => ({
      ...state,
      winner: payload.winner,
      endgameSequence: payload.endgameSequence,
    }));
  },
);

export const markCell = createSubscribableAction(
  (payload: MarkCellPayloadType) => {
    const { column, row } = payload;
    const currentState = useGameStore.getState();

    const newBoard = [...currentState.board];
    const rowArray = [...(newBoard[row] || [])];
    const { turn } = currentState;

    if (!rowArray[column]) {
      rowArray[column] = turn;
    }

    newBoard[row] = rowArray;

    const endgameSequence = findEndgameSequence({
      row,
      column,
      board: newBoard,
    });
    const nextTurn = turn === 'circles' ? 'crosses' : 'circles';

    useGameStore.setState((state) => ({
      ...state,
      turn: endgameSequence ? turn : nextTurn,
      board: newBoard,
    }));

    if (endgameSequence) {
      markGameEnd({
        winner: turn,
        endgameSequence,
      });
    }
  },
);
