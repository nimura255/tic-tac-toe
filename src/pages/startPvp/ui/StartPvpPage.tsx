import ArrowBack from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useShallow } from 'zustand/react/shallow';

import { RegularPageLayout } from '$shared/ui/RegularPageLayout';
import { RegularPageHeader } from '$shared/ui/RegularPageHeader';
import { useScreenStore } from '$shared/lib/router';

import { useStartPvpPageForm } from '../lib/useStartPvpPageForm';

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
  const setScreen = useScreenStore(useShallow((state) => state.setScreen));

  return (
    <RegularPageLayout>
      <RegularPageHeader
        leftButtons={
          <IconButton aria-label="Go back" onClick={() => setScreen('home')}>
            <ArrowBack color="primary" />
          </IconButton>
        }
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
