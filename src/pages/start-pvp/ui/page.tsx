import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RegularPageLayout } from '$shared/ui/regularPageLayout';
import { useStartPvpPageForm } from './hooks';
import { RegularPageHeader } from '$shared/ui/regularPageHeader.tsx';
import { useRouterState } from '$shared/lib/router';

export function StartPvpPage() {
  const {
    crossesUserName,
    setCrossesUserName,
    crossesUserNameError,
    circlesUserName,
    setCirclesUserName,
    circlesUserNameError,
    handleSubmit,
  } = useStartPvpPageForm();
  const { setScreen } = useRouterState();

  return (
    <RegularPageLayout>
      <RegularPageHeader
        leftButtons={<Button onClick={() => setScreen('home')}>Go back</Button>}
        title="Start PVP Match"
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography
          variant="subtitle1"
          component="h2"
          sx={{ textAlign: 'center', fontWeight: 500 }}
        >
          Enter your names
        </Typography>
        <TextField
          name="crosses"
          label="Cross"
          variant="outlined"
          value={crossesUserName}
          onChange={(event) => setCrossesUserName(event.target.value)}
          error={Boolean(crossesUserNameError)}
        />
        <TextField
          name="circles"
          label="Circle"
          variant="outlined"
          value={circlesUserName}
          onChange={(event) => setCirclesUserName(event.target.value)}
          error={Boolean(circlesUserNameError)}
        />
        <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
          Start
        </Button>
      </Box>
    </RegularPageLayout>
  );
}
