import { nanoid } from 'nanoid';
import { createSubscribableAction } from '$shared/lib/createSubscribableAction';
import { useHistoryStore } from './history-store';

type AddToHistoryPayloadType = {
  userNames: {
    circles: string;
    crosses: string;
  };
  winner: 'circles' | 'crosses';
  board: ('circles' | 'crosses')[][];
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
