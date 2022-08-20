import React, { FC } from 'react';

import Home from 'components/Home';
import Login from 'components/Login';
import LoadingIndicator from 'components/LoadingIndicator';
import useAuth from 'hooks/useAuth';
import useApi from 'hooks/useApi';

const TummyHealth: FC = () => {
  const { isAuthenticated } = useAuth();
  const { isReady } = useApi();
  if (!isAuthenticated) return <Login />;
  if (!isReady) return <LoadingIndicator />;
  return <Home />;
};

export default TummyHealth;
