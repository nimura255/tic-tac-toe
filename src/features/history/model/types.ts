import type { BoardFigureType, BoardType } from '$entities/boardFigure';

export type HistoryRecordType = {
  userNames: {
    circles: string;
    crosses: string;
  };
  winner: BoardFigureType;
  board: BoardType;
  endgameSequence: { row: number; column: number }[];
  timestamp: number;
  id: string;
};
