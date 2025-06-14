export function subscribeToTouchEvents(
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
