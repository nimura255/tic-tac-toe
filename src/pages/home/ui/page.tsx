import { Fragment, type ReactNode } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useHomePageForm } from '$pages/home/ui/hooks.ts';
import { useGameStore } from '$features/game';
import { useHistoryStore } from '$features/history';
import { useShallow } from 'zustand/react/shallow';
import { useRouterState } from '$shared/lib/router';

function PVPMatchForm() {
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
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Typography
        variant="h6"
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
      <Button type="submit" variant="contained" sx={{ alignSelf: 'center' }}>
        Start
      </Button>
    </Box>
  );
}

function HistoryList() {
  const records = useHistoryStore(useShallow((state) => state.records));
  const { setScreen } = useRouterState();

  return (
    <List disablePadding>
      {records.map((record, index) => (
        <Fragment key={record.id}>
          <ListItem sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {record.userNames.circles} vs {record.userNames.crosses}
              </Typography>
              <Typography>winner: {record.userNames[record.winner]}</Typography>
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
  );
}

function MenuAccordion({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography sx={{ fontWeight: 500, color: '#1976d2' }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}

export function HomePage() {
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
        <MenuAccordion title="Player vs Player match">
          <PVPMatchForm />
        </MenuAccordion>
        <MenuAccordion title="History">
          <HistoryList />
        </MenuAccordion>
      </Card>
    </Box>
  );
}
