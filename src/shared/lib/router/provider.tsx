import { type ReactNode, useMemo, useState } from 'react';
import type { ScreenType } from '$shared/lib/router/types.ts';
import { RouterContext } from '$shared/lib/router/context.tsx';

export function RouterContextProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<ScreenType>('home');
  const contextValue = useMemo(
    () => ({
      screen,
      setScreen,
    }),
    [screen],
  );

  return <RouterContext value={contextValue}>{children}</RouterContext>;
}
