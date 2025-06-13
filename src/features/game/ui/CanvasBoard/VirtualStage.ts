import { circleIconPath } from '$shared/ui/circleIcon';
import { crossIconPath1, crossIconPath2 } from '$shared/ui/crossIcon';
import type { BoardFigureType } from '$features/game/model/types';
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  CELL_SIZE_PX,
  GRID_GAP_PX,
} from '../../config';

export class VirtualStage {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private position = { left: 0, top: 0 };

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Could not get 2D context');

    this.ctx = ctx;
    this.updateCanvasDimensions();
  }

  public draw(board: BoardFigureType[][]) {
    const ctx = this.ctx;
    const rect = this.canvas.getBoundingClientRect();
    ctx.fillStyle = '#ecebeb';
    ctx.fillRect(0, 0, rect.width, rect.height);

    const visibleCols =
      Math.trunc(rect.width / (CELL_SIZE_PX + GRID_GAP_PX)) + 2;
    const visibleRows =
      Math.trunc(rect.height / (CELL_SIZE_PX + GRID_GAP_PX)) + 2;

    const offsetX = this.position.left % (CELL_SIZE_PX + GRID_GAP_PX);
    const offsetY = this.position.top % (CELL_SIZE_PX + GRID_GAP_PX);

    const gridOffsetX = Math.trunc(
      Math.abs(this.position.left) / (CELL_SIZE_PX + GRID_GAP_PX),
    );
    const gridOffsetY = Math.trunc(
      Math.abs(this.position.top) / (CELL_SIZE_PX + GRID_GAP_PX),
    );

    for (let y = 0; y < visibleRows; y++) {
      for (let x = 0; x < visibleCols; x++) {
        const canvasX =
          GRID_GAP_PX + x * (CELL_SIZE_PX + GRID_GAP_PX) + offsetX;
        const canvasY =
          GRID_GAP_PX + y * (CELL_SIZE_PX + GRID_GAP_PX) + offsetY;
        this.drawCell(canvasX, canvasY);

        const boardCell = board[y + gridOffsetY]?.[x + gridOffsetX];

        if (boardCell) {
          this.drawFigure(canvasX, canvasY, boardCell);
        }
      }
    }
  }

  public getPosition() {
    return this.position;
  }

  public setPosition(x: number, y: number) {
    const rect = this.canvas.getBoundingClientRect();

    const virtualWidth =
      GRID_GAP_PX * 2 +
      CELL_SIZE_PX * BOARD_WIDTH +
      GRID_GAP_PX * (BOARD_WIDTH - 1);
    const virtualHeight =
      GRID_GAP_PX * 2 +
      CELL_SIZE_PX * BOARD_HEIGHT +
      GRID_GAP_PX * (BOARD_HEIGHT - 1);

    const maxOffsetX = (virtualWidth - rect.width) * -1;
    const maxOffsetY = (virtualHeight - rect.height) * -1;

    this.position.left = x;
    this.position.top = y;

    if (this.position.left > 0) {
      this.position.left = 0;
    }

    if (this.position.top > 0) {
      this.position.top = 0;
    }

    if (this.position.top < maxOffsetY) {
      this.position.top = maxOffsetY;
    }

    if (this.position.left < maxOffsetX) {
      this.position.left = maxOffsetX;
    }
  }

  public updatePosition(deltaX: number, deltaY: number) {
    this.setPosition(this.position.left + deltaX, this.position.top + deltaY);
  }

  public getBoardCoords(offsetX: number, offsetY: number) {
    const xOnScene = Math.abs(this.position.left) + offsetX;
    const yOnScene = Math.abs(this.position.top) + offsetY;

    const cellSizeWithGap = CELL_SIZE_PX + GRID_GAP_PX;
    const cellX = Math.trunc(xOnScene / cellSizeWithGap);
    const cellY = Math.trunc(yOnScene / cellSizeWithGap);

    const withinX = xOnScene % cellSizeWithGap > GRID_GAP_PX;
    const withinY = yOnScene % cellSizeWithGap > GRID_GAP_PX;

    return {
      indexX: withinX ? cellX : null,
      indexY: withinY ? cellY : null,
    };
  }

  public jumpToCell(indexX: number, indexY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const cellsInHalfWidth = Math.trunc(
      rect.width / (2 * (CELL_SIZE_PX + GRID_GAP_PX)),
    );
    const cellsInHalfHeight = Math.trunc(
      rect.height / (2 * (CELL_SIZE_PX + GRID_GAP_PX)),
    );

    const coordX = (indexX - cellsInHalfWidth) * (CELL_SIZE_PX + GRID_GAP_PX);
    const coordY = (indexY - cellsInHalfHeight) * (CELL_SIZE_PX + GRID_GAP_PX);

    this.setPosition(-coordX, -coordY);
  }

  public updateCanvasDimensions() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private drawCell(x: number, y: number) {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(x, y, CELL_SIZE_PX, CELL_SIZE_PX);
  }

  private drawFigure(x: number, y: number, kind: BoardFigureType) {
    if (kind === 'circles') {
      this.drawCircle(x, y);
    } else if (kind === 'crosses') {
      this.drawCross(x, y);
    }
  }

  private drawCircle(x: number, y: number) {
    this.ctx.save();

    const path = new Path2D(circleIconPath);

    this.ctx.translate(x, y);
    this.ctx.scale(3.5, 3.5);
    this.ctx.fillStyle = 'red';
    this.ctx.fill(path);

    this.ctx.restore();
  }

  private drawCross(x: number, y: number) {
    this.ctx.save();

    const path1 = new Path2D(crossIconPath1);
    const path2 = new Path2D(crossIconPath2);

    this.ctx.translate(Math.trunc(x), Math.trunc(y));
    this.ctx.scale(3.5, 3.5);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill(path1);
    this.ctx.fill(path2);

    this.ctx.restore();
  }
}
