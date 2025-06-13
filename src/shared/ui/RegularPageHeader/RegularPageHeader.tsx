import type { ReactNode } from 'react';
import { Container, Title } from './styled';

export function RegularPageHeader({
  leftButtons,
  title,
}: {
  leftButtons: ReactNode;
  title: string;
}) {
  return (
    <Container>
      {leftButtons}
      <Title variant="h6">{title}</Title>
    </Container>
  );
}
