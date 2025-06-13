import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { HistoryRecordType } from './types';

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
