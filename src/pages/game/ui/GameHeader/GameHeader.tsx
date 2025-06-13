import ArrowBack from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { CurrentPlayerTitle } from '../CurrentPlayerTitle';
import { goToHomeScreen } from '../../lib/goToHomeScreen';
import { Container } from './styled';

export function GameHeader() {
  return (
    <Container>
      <IconButton aria-label="Exit" onClick={goToHomeScreen}>
        <ArrowBack color="primary" />
      </IconButton>

      <CurrentPlayerTitle />
    </Container>
  );
}
