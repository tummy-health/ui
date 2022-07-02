import React, { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

import useAuth from 'hooks/useAuth';

export const ApiProvider: FC<Props> = ({ children, uri }) => {
  const { getToken, isAuthenticated } = useAuth();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    if (getToken && isAuthenticated && token && setToken) {
      const saveToken = async () => {
        const { token: tokenToSave } = await getToken();
        setToken(tokenToSave);
      };
      saveToken();
    }
  }, [getToken, isAuthenticated, token, setToken]);

  const client = useMemo(() => {
    if (!token) return undefined;
    return getClient({ token, uri });
  }, [token, uri]);

  if (!client) return children;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

interface Props {
  children: ReactElement;
  uri: string;
}

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

export const TestApiProvider: FC<TestProps> = ({ children, mocks }) => (
  <MockedProvider mocks={mocks}>{children}</MockedProvider>
);

interface TestProps {
  children: ReactElement;
  mocks?: MockedApiResponse[];
}

export type MockedApiResponse = MockedResponse;

export default undefined;
