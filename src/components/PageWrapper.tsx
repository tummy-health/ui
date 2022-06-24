import React, { FC, ReactNode } from 'react';

const PageWrapper: FC<Props> = ({ children, name }) => (
  <main data-testid={name ? `page-wrapper-${name}` : 'page-wrapper'}>
    {children}
  </main>
);

interface Props {
  children: ReactNode;
  name?: string;
}

export default PageWrapper;
