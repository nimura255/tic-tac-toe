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

export const useHistoryStore = create<HistoryStoreStateType>()(
  persist(
    () =>
      ({
        records: [],
      }) as HistoryStoreStateType,
    { name: 'tic-tac-toe-history' },
  ),
);
