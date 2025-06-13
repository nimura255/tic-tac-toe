import { useEffect, useRef } from 'react';
import { useGameStore } from '$features/game';
import { Canvas } from './Canvas';
import { VirtualStage } from './VirtualStage';

export function Board({ readonly }: { readonly?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const virtualStage = new VirtualStage(canvas);

    const draw = () => {
      const board = useGameStore.getState().board;
      virtualStage.draw(board);
    };

    const handleWheelEvent = (event: WheelEvent) => {
      event.preventDefault();

      virtualStage.updatePosition(-event.deltaX, -event.deltaY);
      requestAnimationFrame(draw);
    };

    const handleClickEvent = (event: MouseEvent) => {
      if (readonly) {
        return;
      }

      const { offsetX, offsetY } = event;
      const { indexX, indexY } = virtualStage.getBoardCoords(offsetX, offsetY);

      if (indexX !== null && indexY !== null) {
        useGameStore.getState().markCell({
          row: indexY,
          column: indexX,
        });
      }
    };

    const handleResizeEvent = () => {
      virtualStage.updateCanvasDimensions();
      draw();
    };

    const endgameSequence = useGameStore.getState().endgameSequence;

    if (endgameSequence?.length) {
      virtualStage.jumpToCell(
        endgameSequence[2].column,
        endgameSequence[2].row,
      );
    }

    draw();

    window.addEventListener('resize', handleResizeEvent);
    canvas.addEventListener('wheel', handleWheelEvent);
    canvas.addEventListener('click', handleClickEvent);

    const unsubscribeFromBoardState = useGameStore.subscribe(
      (state) => state.board,
      () => {
        requestAnimationFrame(draw);
      },
    );

    const unsubscribeFromEndgameSequence = useGameStore.subscribe(
      (state) => state.endgameSequence,
      (endgameSequence) => {
        if (!endgameSequence?.length) {
          virtualStage.jumpToCell(0, 0);
        }

        draw();
      },
    );

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
      canvas.removeEventListener('wheel', handleWheelEvent);
      canvas.removeEventListener('click', handleClickEvent);
      unsubscribeFromBoardState();
      unsubscribeFromEndgameSequence();
    };
  }, [readonly]);

  return <Canvas ref={canvasRef} />;
}
