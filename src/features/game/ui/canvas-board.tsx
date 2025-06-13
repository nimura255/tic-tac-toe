import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_SIZE_PX,
  GRID_GAP_PX,
} from '../config';
import { useGameStore } from '$features/game';
import { circleIconPath } from '$shared/ui/circleIcon';
import { crossIconPath1, crossIconPath2 } from '$shared/ui/crossIcon';
import type { BoardFigureType } from '$features/game/model/game-store.ts';

const StyledCanvas = styled.canvas`
  height: 100%;
  width: 100%;
  border-radius: 16px;
  border: 1px solid black;
  overflow: hidden;
`;

function calcIndexFromOffset(offset: number) {
  const absOffset = Math.abs(offset);

  return Math.trunc(absOffset / (CELL_SIZE_PX + GRID_GAP_PX));
}

function setupHiDPICanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawGridCell(params: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}) {
  const { ctx, x, y } = params;

  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, CELL_SIZE_PX, CELL_SIZE_PX);
}

function drawRedCircle(params: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}) {
  const { ctx, x, y } = params;

  ctx.save();

  const path = new Path2D(circleIconPath);

  ctx.translate(x, y);
  ctx.scale(3.5, 3.5);
  ctx.fillStyle = 'red';
  ctx.fill(path);

  ctx.restore();
}

function drawBlueCross(params: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
}) {
  const { ctx, x, y } = params;

  ctx.save();

  const path1 = new Path2D(crossIconPath1);
  const path2 = new Path2D(crossIconPath2);

  ctx.translate(Math.trunc(x), Math.trunc(y));
  ctx.scale(3.5, 3.5);
  ctx.fillStyle = 'blue';
  ctx.fill(path1);
  ctx.fill(path2);

  ctx.restore();
}

function drawBoardFigure(params: {
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  kind: BoardFigureType | null;
}) {
  const { ctx, x, y, kind } = params;

  if (!kind) {
    return;
  }

  if (kind === 'circles') {
    drawRedCircle({ ctx, x, y });
  } else if (kind === 'crosses') {
    drawBlueCross({ ctx, x, y });
  }
}

function drawGrid(
  canvas: HTMLCanvasElement,
  position: { top: number; left: number },
) {
  const canvasRect = canvas.getBoundingClientRect();
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  ctx.fillStyle = '#ecebeb';
  ctx.fillRect(0, 0, canvasRect.width, canvasRect.height);

  const visibleRowSize =
    Math.trunc(canvasRect.width / (CELL_SIZE_PX + GRID_GAP_PX)) + 2;
  const numberOfVisibleRows =
    Math.trunc(canvasRect.height / (CELL_SIZE_PX + GRID_GAP_PX)) + 2;

  const visibleOffsetX = position.left % (CELL_SIZE_PX + GRID_GAP_PX);
  const visibleOffsetY = position.top % (CELL_SIZE_PX + GRID_GAP_PX);

  const gridIndexOffsetX = calcIndexFromOffset(position.left);
  const gridIndexOffsetY = calcIndexFromOffset(position.top);

  const board = useGameStore.getState().board;

  for (let y = 0; y < numberOfVisibleRows; y++) {
    for (let x = 0; x < visibleRowSize; x++) {
      const xPos = x * (CELL_SIZE_PX + GRID_GAP_PX);
      const yPos = y * (CELL_SIZE_PX + GRID_GAP_PX);
      const boardCell = board[y + gridIndexOffsetY]?.[x + gridIndexOffsetX];

      drawGridCell({
        ctx,
        x: GRID_GAP_PX + xPos + visibleOffsetX,
        y: GRID_GAP_PX + yPos + visibleOffsetY,
      });

      drawBoardFigure({
        ctx,
        x: GRID_GAP_PX + xPos + visibleOffsetX,
        y: GRID_GAP_PX + yPos + visibleOffsetY,
        kind: boardCell,
      });
    }
  }
}

function getBoardCoordsFromPhysicalCoords(params: {
  offsetX: number;
  offsetY: number;
  stagePosition: { left: number; top: number };
}) {
  const { offsetX, offsetY, stagePosition } = params;
  const xOnVirtualScene = Math.abs(stagePosition.left) + offsetX;
  const yOnVirtualScene = Math.abs(stagePosition.top) + offsetY;

  const numberOfPrevCellsX = Math.trunc(
    xOnVirtualScene / (CELL_SIZE_PX + GRID_GAP_PX),
  );
  const numberOfPrevCellsY = Math.trunc(
    yOnVirtualScene / (CELL_SIZE_PX + GRID_GAP_PX),
  );
  const distanceToPrevCellX = xOnVirtualScene % (CELL_SIZE_PX + GRID_GAP_PX);
  const distanceToPrevCellY = yOnVirtualScene % (CELL_SIZE_PX + GRID_GAP_PX);

  const indexX = distanceToPrevCellX > GRID_GAP_PX ? numberOfPrevCellsX : null;
  const indexY = distanceToPrevCellY > GRID_GAP_PX ? numberOfPrevCellsY : null;

  return {
    indexX,
    indexY,
  };
}

export function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasPositionRef = useRef({ left: 0, top: 0 });

  useEffect(() => {
    const draw = () => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const physicalSizes = canvas.getBoundingClientRect();
      setupHiDPICanvas(canvas, physicalSizes.width, physicalSizes.height);

      drawGrid(canvas, canvasPositionRef.current);
    };

    const updatePosition = ({
      incrementX,
      incrementY,
    }: {
      incrementX: number;
      incrementY: number;
    }) => {
      const canvas = canvasRef.current;

      if (!canvas) {
        return;
      }

      const canvasRect = canvas.getBoundingClientRect();

      const virtualWidth =
        GRID_GAP_PX * 2 +
        CELL_SIZE_PX * BOARD_WIDTH +
        GRID_GAP_PX * (BOARD_WIDTH - 1);
      const maxOffsetX = (virtualWidth - canvasRect.width) * -1;

      const virtualHeight =
        GRID_GAP_PX * 2 +
        CELL_SIZE_PX * BOARD_HEIGHT +
        GRID_GAP_PX * (BOARD_HEIGHT - 1);
      const maxOffsetY = (virtualHeight - canvasRect.height) * -1;

      canvasPositionRef.current.left += incrementX;
      canvasPositionRef.current.top += incrementY;

      if (canvasPositionRef.current.left > 0) {
        canvasPositionRef.current.left = 0;
      }

      if (canvasPositionRef.current.top > 0) {
        canvasPositionRef.current.top = 0;
      }

      if (canvasPositionRef.current.top < maxOffsetY) {
        canvasPositionRef.current.top = maxOffsetY;
      }

      if (canvasPositionRef.current.left < maxOffsetX) {
        canvasPositionRef.current.left = maxOffsetX;
      }
    };

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      updatePosition({ incrementY: -event.deltaY, incrementX: -event.deltaX });
      requestAnimationFrame(draw);
    };

    const handleClick = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      const { indexX, indexY } = getBoardCoordsFromPhysicalCoords({
        offsetX,
        offsetY,
        stagePosition: canvasPositionRef.current,
      });

      if (indexX !== null && indexY !== null) {
        useGameStore.getState().markCell({
          row: indexY,
          column: indexX,
        });
      }
    };

    const unsubscribeFromBoardState = useGameStore.subscribe(
      (state) => state.board,
      () => {
        requestAnimationFrame(draw);
      },
    );

    draw();

    window.addEventListener('resize', draw);
    const canvasElement = canvasRef.current;
    canvasElement?.addEventListener('wheel', handleScroll);
    canvasElement?.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', draw);
      canvasElement?.removeEventListener('wheel', handleScroll);
      canvasElement?.removeEventListener('click', handleClick);
      unsubscribeFromBoardState();
    };
  }, []);

  return (
    <>
      <StyledCanvas ref={canvasRef} onScroll={(event) => console.log(event)} />
    </>
  );
}
