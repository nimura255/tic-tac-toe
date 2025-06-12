import { memo, type MouseEvent } from 'react';
import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { useGameStore } from '$features/game';
import { BOARD_HEIGHT, BOARD_WIDTH, CELL_SIZE, GRID_GAP } from '../config';
import { useShallow } from 'zustand/react/shallow';
import { FigureIcon } from '$features/game';

const BoardCell = memo(({ row, column }: { row: number; column: number }) => {
  const value = useGameStore(useShallow((state) => state.board[row]?.[column]));

  return (
    <Box
      sx={{
        cursor: 'pointer',
        background: 'white',
        height: CELL_SIZE,
        width: CELL_SIZE,
      }}
      data-row={row}
      data-column={column}
    >
      <FigureIcon type={value} />
    </Box>
  );
});

function renderCells() {
  const cells: ReactNode[] = [];

  for (let i = 0; i < BOARD_HEIGHT; i++) {
    for (let j = 0; j < BOARD_WIDTH; j++) {
      cells.push(<BoardCell key={`${i}-${j}`} row={i} column={j} />);
    }
  }

  return cells;
}

export const Board = memo(() => {
  const markCell = useGameStore(useShallow((state) => state.markCell));

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { row, column } = target.dataset;

    if (!row || !column) {
      return;
    }

    markCell({ row: Number(row), column: Number(column) });
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        background: '#ecebeb',
        height: '100%',
        width: '100%',
        borderRadius: '16px',
        border: '1px solid black',
        overflow: 'scroll',
        display: 'grid',
        padding: GRID_GAP,
        boxSizing: 'border-box',
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE})`,
        gap: GRID_GAP,
      }}
    >
      {renderCells()}
    </Box>
  );
});
