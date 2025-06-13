import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type HistoryRecordType = {
  userNames: {
    circles: string;
    crosses: string;
  };
  // TODO: move this and BoardFigureType to $entities
  winner: 'circles' | 'crosses';
  board: ('circles' | 'crosses')[][];
  endgameSequence: { row: number; column: number }[];
  timestamp: number;
  id: string;
};
type HistoryStoreStateType = {
  records: HistoryRecordType[];
};

type AddToHistoryPayloadType = Pick<
  HistoryRecordType,
  'userNames' | 'winner' | 'board' | 'endgameSequence'
>;

type HistoryStoreActionsType = {
  addToHistory(record: AddToHistoryPayloadType): void;
};

type HistoryStoreType = HistoryStoreStateType & HistoryStoreActionsType;

export const useHistoryStore = create<HistoryStoreType>()(
  persist(
    (set) => ({
      records: [],
      addToHistory: (payload) => {
        set((state) => {
          const newRecord = {
            ...payload,
            id: nanoid(),
            timestamp: Date.now(),
          };

          return {
            ...state,
            records: [newRecord, ...state.records.slice(0, 19)],
          };
        });
      },
    }),
    { name: 'tic-tac-toe-history' },
  ),
);
