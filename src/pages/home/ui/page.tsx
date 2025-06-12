import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouterState } from '$shared/lib/router';
import { RegularPageLayout } from '$shared/ui/regularPageLayout';

export function HomePage() {
  const { setScreen } = useRouterState();

  return (
    <RegularPageLayout>
      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: 'center', fontWeight: 500, pb: '20px' }}
      >
        Tic-tac-toe
      </Typography>
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
