export function createSubscribableAction<P extends unknown[]>(
  func: (...args: P) => void,
) {
  const listeners = new Set<(...args: P) => void>();

  const resultFunc = function (...args: P) {
    func(...args);
    listeners.forEach((listener) => listener(...args));
  };

  resultFunc.subscribe = (listener: (...args: P) => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  return resultFunc;
}
