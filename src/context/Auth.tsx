import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import noop from 'utils/noop';

const AuthContext = createContext<Context>({
  isAuthenticated: false,
  login: noop,
  logout: noop,
});

interface Context {
  getToken?: () => Promise<{ token: string }>;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthProvider: FC<Props> = ({ children }) => (
  <Auth0Provider
    clientId="zZl8zCFpO6i9wZtLEMxXmGdK1HSfzFqF"
    domain="dev-gia5r5ix.us.auth0.com"
    redirectUri={window.location.origin}
  >
    <InnerProvider>{children}</InnerProvider>
  </Auth0Provider>
);

interface Props {
  children: ReactNode;
}

const InnerProvider: FC<Props> = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, logout } =
    useAuth0();
  const context = useMemo(
    () => ({
      getToken: async () => {
        const token = await getAccessTokenSilently();
        return { token };
      },
      isAuthenticated,
      login: loginWithRedirect,
      logout,
    }),
    [getAccessTokenSilently, isAuthenticated, loginWithRedirect, logout]
  );
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const TestAuthProvider: FC<TestProps> = ({
  children,
  isAuthenticated: isInitiallyAuthenticated = true,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    isInitiallyAuthenticated
  );
  const context = useMemo(
    () => ({
      isAuthenticated,
      login: () => {
        setIsAuthenticated(true);
      },
      logout: () => {
        setIsAuthenticated(false);
      },
    }),
    [isAuthenticated, setIsAuthenticated]
  );
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

interface TestProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default AuthContext;
