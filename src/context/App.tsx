import React, { FC, ReactNode } from 'react';

import { AuthProvider, TestAuthProvider } from 'context/Auth';

const Provider: FC<Props> = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

interface Props {
  children: ReactNode;
}

export const TestProvider: FC<TestProps> = ({ children, isAuthenticated }) => (
  <TestAuthProvider isAuthenticated={isAuthenticated}>
    {children}
  </TestAuthProvider>
);

interface TestProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default Provider;
