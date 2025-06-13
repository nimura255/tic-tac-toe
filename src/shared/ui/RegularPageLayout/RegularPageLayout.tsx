import type { ReactNode } from 'react';
import { ContentContainer, PageContainer } from './styled';

type PropsType = {
  children: ReactNode;
};

export function RegularPageLayout({ children }: PropsType) {
  return (
    <PageContainer>
      <ContentContainer raised>{children}</ContentContainer>
    </PageContainer>
  );
}
