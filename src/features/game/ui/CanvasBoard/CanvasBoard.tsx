import { useEffect, useRef } from 'react';
import { useGameStore, markCell, startGame } from '$features/game';
import { Canvas } from './styled';
import { VirtualStage } from './VirtualStage';
import { subscribeToTouchEvents } from './utils';

export function Board({ readonly }: { readonly?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const virtualStage = new VirtualStage(canvas);
    let endgameSequence = useGameStore.getState().endgameSequence;

    if (endgameSequence?.length) {
      virtualStage.jumpToCell(
        endgameSequence[2].column,
        endgameSequence[2].row,
      );
    }

    const draw = () => {
      const board = useGameStore.getState().board;
      virtualStage.draw(board, endgameSequence);
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
      (state) => {
        endgameSequence = state;
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
      unsubscribeFromEndgameSequence();
    };
  }, [readonly]);

  return <Canvas ref={canvasRef} />;
}
