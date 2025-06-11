import { useContext } from 'react';
import { RouterContext } from './context';

export function useRouterState() {
  const value = useContext(RouterContext);

  if (!value) {
    throw new Error(
      'useRouterState should only be called inside RouterContextProvider',
    );
  }

  return value;
}
