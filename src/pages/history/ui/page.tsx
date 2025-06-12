import { Fragment } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { useShallow } from 'zustand/react/shallow';
import { useGameStore } from '$features/game';
import { useHistoryStore } from '$features/history';
import { useRouterState } from '$shared/lib/router';
import { RegularPageLayout } from '$shared/ui/regularPageLayout';
import { RegularPageHeader } from '$shared/ui/regularPageHeader.tsx';

export function HistoryPage() {
  const records = useHistoryStore(useShallow((state) => state.records));
  const { setScreen } = useRouterState();

  return (
    <RegularPageLayout>
      <RegularPageHeader
        leftButtons={<Button onClick={() => setScreen('home')}>Go back</Button>}
        title="History"
      />
      <List disablePadding>
        {records.map((record, index) => (
          <Fragment key={record.id}>
            <ListItem sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {record.userNames.circles} vs {record.userNames.crosses}
                </Typography>
                <Typography>
                  winner: {record.userNames[record.winner]}
                </Typography>
              </Box>

              <Button
                onClick={() => {
                  setScreen('game-review');
                  useGameStore.getState().setGameState({
                    users: record.userNames,
                    board: record.board,
                  });
                }}
              >
                Review
              </Button>
            </ListItem>
            {index < records.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </RegularPageLayout>
  );
}
