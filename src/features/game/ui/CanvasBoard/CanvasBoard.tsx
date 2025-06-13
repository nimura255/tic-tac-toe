import { useEffect, useRef } from 'react';
import { useGameStore } from '$features/game';
import { Canvas } from './Canvas';
import { VirtualStage } from './VirtualStage';

export function Board() {
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
      const { offsetX, offsetY } = event;
      const { indexX, indexY } = virtualStage.getBoardCoords(offsetX, offsetY);

      if (indexX !== null && indexY !== null) {
        useGameStore.getState().markCell({
          row: indexY,
          column: indexX,
        });
      }
    };

    draw();

    window.addEventListener('resize', draw);
    canvas.addEventListener('wheel', handleWheelEvent);
    canvas.addEventListener('click', handleClickEvent);

    const unsubscribeFromBoardState = useGameStore.subscribe(
      (state) => state.board,
      () => {
        requestAnimationFrame(draw);
      },
    );

    return () => {
      window.removeEventListener('resize', draw);
      canvas.removeEventListener('wheel', handleWheelEvent);
      canvas.removeEventListener('click', handleClickEvent);
      unsubscribeFromBoardState();
    };
  }, []);

  return <Canvas ref={canvasRef} />;
}
