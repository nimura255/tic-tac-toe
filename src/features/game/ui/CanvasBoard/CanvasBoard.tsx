import { useEffect, useRef } from 'react';
import { useGameStore, markCell, startGame } from '$features/game';
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

    const unsubscribeFromTouchEvents = subscribeToTouchEvents(
      canvas,
      (deltaX, deltaY) => {
        virtualStage.updatePosition(-deltaX, -deltaY);
        requestAnimationFrame(draw);
      },
    );

    const handleClickEvent = (event: MouseEvent) => {
      if (readonly) {
        return;
      }

      const { offsetX, offsetY } = event;
      const { indexX, indexY } = virtualStage.getBoardCoords(offsetX, offsetY);

      if (indexX !== null && indexY !== null) {
        markCell({
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
    const unsubscribeFromStartGameAction = startGame.subscribe(() => {
      virtualStage.jumpToCell(0, 0);
      draw();
    });

    return () => {
      window.removeEventListener('resize', handleResizeEvent);
      canvas.removeEventListener('wheel', handleWheelEvent);
      canvas.removeEventListener('click', handleClickEvent);
      unsubscribeFromBoardState();
      unsubscribeFromStartGameAction();
      unsubscribeFromTouchEvents();
    };
  }, [readonly]);

  return <Canvas ref={canvasRef} />;
}

function subscribeToTouchEvents(
  element: HTMLElement,
  callback: (deltaX: number, deltaY: number) => void,
) {
  let lastTouchCoords: { x: number; y: number } | null = null;

  const handleTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      lastTouchCoords = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }
  };

  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();

    if (event.touches.length !== 1 || lastTouchCoords === null) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const currentY = event.touches[0].clientY;

    const deltaX = lastTouchCoords.x - currentX;
    const deltaY = lastTouchCoords.y - currentY;

    callback(deltaX, deltaY);

    lastTouchCoords = { x: currentX, y: currentY };
  };

  const handleTouchEnd = () => {
    lastTouchCoords = null;
  };

  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchmove', handleTouchMove);
  element.addEventListener('touchend', handleTouchEnd);

  return () => {
    element.removeEventListener('touchstart', handleTouchStart);
    element.removeEventListener('touchmove', handleTouchMove);
    element.removeEventListener('touchend', handleTouchEnd);
  };
}
