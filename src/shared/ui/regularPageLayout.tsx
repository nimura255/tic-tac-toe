import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import type { ReactNode } from 'react';

export function RegularPageLayout({ children }: { children: ReactNode }) {
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
        raised
        sx={{
          maxWidth: '600px',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Card>
    </Box>
  );
}
