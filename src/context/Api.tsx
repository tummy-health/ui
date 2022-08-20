import React, {
  createContext,
  FC,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import useAuth from 'hooks/useAuth';

const ApiContext = createContext<{ isReady: boolean }>({ isReady: false });

export const ApiProvider: FC<{ children: ReactElement; uri: string }> = ({
  children,
  uri,
}) => {
  const { getToken, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (getToken && isAuthenticated && setToken) {
      const saveToken = async () => {
        const { token: tokenToSave } = await getToken();
        setToken(tokenToSave);
      };
      saveToken();
    }
  }, [getToken, isAuthenticated, setToken]);

  const client = useMemo(() => {
    if (!token) return undefined;
    return getClient({ token, uri });
  }, [token, uri]);

  if (!client) return <InnerProvider>{children}</InnerProvider>;

  return (
    <ApolloProvider client={client}>
      <InnerProvider client={client}>{children}</InnerProvider>
    </ApolloProvider>
  );
};

const InnerProvider: FC<{
  children: ReactElement;
  client?: ApolloClient<NormalizedCacheObject>;
}> = ({ children, client }) => {
  const memoizedContext = useMemo(() => ({ isReady: !!client }), [client]);
  return (
    <ApiContext.Provider value={memoizedContext}>
      {children}
    </ApiContext.Provider>
  );
};

const getClient = ({ token, uri }: { token: string; uri: string }) => {
  const authLink = setContext((_, { headers }) => {
    const result = {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
    return result;
  });
  const httpLink = createHttpLink({ uri });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });
};

export const TestApiProvider: FC<{
  children: ReactElement;
  isReady?: boolean;
  mocks?: MockedApiResponse[];
}> = ({ children, isReady, mocks }) => (
  <MockedProvider mocks={mocks}>
    <TestInnerProvider isReady={isReady}>{children}</TestInnerProvider>
  </MockedProvider>
);

const TestInnerProvider: FC<{
  children: ReactElement;
  isReady?: boolean;
}> = ({ children, isReady = true }) => {
  const memoizedContext = useMemo(() => ({ isReady }), [isReady]);
  return (
    <ApiContext.Provider value={memoizedContext}>
      {children}
    </ApiContext.Provider>
  );
};

export type MockedApiResponse = MockedResponse;

export default ApiContext;
