import { Fragment } from 'react';

import ArrowBack from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { useShallow } from 'zustand/react/shallow';

import { useHistoryStore } from '$features/history';
import { useScreenStore } from '$shared/lib/router';
import { RegularPageLayout } from '$shared/ui/RegularPageLayout';
import { RegularPageHeader } from '$shared/ui/RegularPageHeader';

import { HistoryListItem } from '..//HistoryListItem';

export function HistoryPage() {
  const records = useHistoryStore(useShallow((state) => state.records));
  const setScreen = useScreenStore(useShallow((state) => state.setScreen));

  return (
    <RegularPageLayout>
      <RegularPageHeader
        leftButtons={
          <IconButton aria-label="Go back" onClick={() => setScreen('home')}>
            <ArrowBack color="primary" />
          </IconButton>
        }
        title="History"
      />

      <List disablePadding sx={{ overflow: 'scroll' }}>
        {records.map((record, index) => (
          <Fragment key={record.id}>
            <HistoryListItem record={record} />
            {index < records.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </RegularPageLayout>
  );
}
