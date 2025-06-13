import { nanoid } from 'nanoid';
import type { BoardFigureType, BoardType } from '$entities/boardFigure';
import { createSubscribableAction } from '$shared/lib/createSubscribableAction';
import { useHistoryStore } from './historyStore';

type AddToHistoryPayloadType = {
  userNames: {
    circles: string;
    crosses: string;
  };
  winner: BoardFigureType;
  board: BoardType;
  endgameSequence: { row: number; column: number }[];
};

export const addToHistory = createSubscribableAction(
  (payload: AddToHistoryPayloadType) => {
    const newRecord = {
      ...payload,
      id: nanoid(),
      timestamp: Date.now(),
    };

    useHistoryStore.setState((state) => ({
      ...state,
      records: [newRecord, ...state.records.slice(0, 19)],
    }));
  },
);
