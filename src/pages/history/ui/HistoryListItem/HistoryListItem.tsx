import Button from '@mui/material/Button';
import { useShallow } from 'zustand/react/shallow';

import { setGameState } from '$features/game';
import type { HistoryRecordType } from '$features/history';
import { useScreenStore } from '$shared/lib/router';

import {
  DividingText,
  ListItemContainer,
  NameSpan,
  TextContentContainer,
  TitleContainer,
  WinnerText,
} from './styled.ts';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';

type PropsType = {
  record: HistoryRecordType;
};

export function HistoryListItem({ record }: PropsType) {
  const setScreen = useScreenStore(useShallow((state) => state.setScreen));

  const dateString = useMemo(() => {
    const dateObj = new Date(record.timestamp);

    return `${dateObj.toLocaleDateString()}, ${dateObj.toLocaleTimeString()}`;
  }, [record.timestamp]);

  const handleClick = () => {
    setGameState({
      users: record.userNames,
      board: record.board,
      winner: record.winner,
      endgameSequence: [...record.endgameSequence],
    });
    setScreen('game-review');
  };

  return (
    <ListItemContainer>
      <TextContentContainer>
        <TitleContainer>
          <NameSpan $kind="circles">{record.userNames.circles}</NameSpan>
          <DividingText>vs</DividingText>
          <NameSpan $kind="crosses">{record.userNames.crosses}</NameSpan>
        </TitleContainer>

        <WinnerText>
          winner:
          <NameSpan $kind={record.winner}>
            {record.userNames[record.winner]}
          </NameSpan>
        </WinnerText>

        <Typography>Date: {dateString}</Typography>
      </TextContentContainer>

      <Button onClick={handleClick}>Review</Button>
    </ListItemContainer>
  );
}
