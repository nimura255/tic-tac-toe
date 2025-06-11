import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useCurrentGameStore = create(
  combine(
    {
      users: {
        circles: '',
        crosses: '',
      },
    },
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
    }),
  ),
);
