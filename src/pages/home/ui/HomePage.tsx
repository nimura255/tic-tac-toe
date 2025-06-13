import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useShallow } from 'zustand/react/shallow';
import { FigureIcon } from '$features/game';
import { useScreenStore } from '$shared/lib/router';
import { RegularPageLayout } from '$shared/ui/RegularPageLayout';

export function HomePage() {
  const setScreen = useScreenStore(useShallow((state) => state.setScreen));

  return (
    <RegularPageLayout>
      <Box sx={{ alignSelf: 'center', pb: '20px', '&>*': { width: '50px' } }}>
        <FigureIcon type="crosses" />
        <FigureIcon type="circles" />
        <FigureIcon type="crosses" />
        <FigureIcon type="circles" />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Button variant="contained" onClick={() => setScreen('start-pvp')}>
          Player vs Player match
        </Button>
        <Button variant="contained" onClick={() => setScreen('history')}>
          History
        </Button>
      </Box>
    </RegularPageLayout>
  );
}
