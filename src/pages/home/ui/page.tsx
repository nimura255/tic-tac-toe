import { Box, Button, Card, Typography, TextField } from '@mui/material';
import { useHomePageForm } from './hooks';

export function HomePage() {
  const {
    crossesUserName,
    setCrossesUserName,
    crossesUserNameError,
    circlesUserName,
    setCirclesUserName,
    circlesUserNameError,
    handleSubmit,
  } = useHomePageForm();

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        boxSizing: 'border-box',
        background: '#ecebeb',
      }}
    >
      <Card
        component="form"
        onSubmit={handleSubmit}
        raised
        sx={{
          maxWidth: '300px',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ textAlign: 'center', fontWeight: 500 }}
        >
          Enter your name(s)
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
        <Button type="submit">Start</Button>
      </Card>
    </Box>
  );
}
