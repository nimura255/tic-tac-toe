import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export function RegularPageHeader({
  leftButtons,
  title,
}: {
  leftButtons: ReactNode;
  title: string;
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        alignItems: 'center',
        justifyItems: 'start',
        pb: '20px',
      }}
    >
      {leftButtons}
      <Typography
        variant="h6"
        component="h1"
        sx={{ textAlign: 'center', fontWeight: 500, justifySelf: 'center' }}
      >
        {title}
      </Typography>
    </Box>
  );
}
