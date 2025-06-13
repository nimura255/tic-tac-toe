import type { BoardType } from './types';

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

export function findEndgameSequence(params: {
  row: number;
  column: number;
  board: BoardType;
}): { row: number; column: number }[] | null {
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

    const sequence: { row: number; column: number }[] = [];

    while (
      checkIntervalCondition(firstRow, lastRow, currentRow) &&
      checkIntervalCondition(firstColumn, lastColumn, currentColumn)
    ) {
      const cell = board[currentRow]?.[currentColumn];

      if (cell !== kind) {
        break;
      }

      currentRow += rowIncrement;
      currentColumn += colIncrement;
      sequence.push({
        row: currentRow,
        column: currentColumn,
      });
    }

    if (sequence.length === 5) {
      return sequence;
    }
  }

  return null;
}

export function selectIncrement(from: number, to: number) {
  if (from < to) {
    return 1;
  }

  if (from > to) {
    return -1;
  }

  return 0;
}

export function checkIntervalCondition(
  from: number,
  to: number,
  current: number,
) {
  if (from < to) {
    return current <= to;
  }

  if (from > to) {
    return current >= to;
  }

  return current === to;
}
