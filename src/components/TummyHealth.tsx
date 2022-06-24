import React, { FC } from 'react';

import Home from 'components/Home';
import Login from 'components/Login';
import useAuth from 'hooks/useAuth';

const TummyHealth: FC = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Login />;
  return <Home />;
};

export default TummyHealth;
