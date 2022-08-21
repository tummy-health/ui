import React, { FC, ReactElement } from 'react';

import { ApiProvider, MockedApiResponse, TestApiProvider } from 'context/Api';
import { AuthProvider, TestAuthProvider } from 'context/Auth';

const Provider: FC<Props> = ({ children }) => (
  <AuthProvider>
    <ApiProvider uri="http://localhost:8000/dev/graphql">
      {children}
    </ApiProvider>
  </AuthProvider>
);

interface Props {
  children: ReactElement;
}

export const TestProvider: FC<TestProps> = ({
  children,
  isAuthenticated,
  mocks,
}) => (
  <TestAuthProvider isAuthenticated={isAuthenticated}>
    <TestApiProvider mocks={mocks}>{children}</TestApiProvider>
  </TestAuthProvider>
);

interface TestProps {
  children: ReactElement;
  isAuthenticated?: boolean;
  mocks?: MockedApiResponse[];
}

export default Provider;
