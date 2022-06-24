import React, { FC } from 'react';

import Button from 'components/Button';
import Home from 'components/Home';
import useAuth from 'hooks/useAuth';

const TummyHealth: FC = () => {
  const { isAuthenticated, login } = useAuth();
  if (!isAuthenticated) return <Button onClick={login}>login</Button>;
  return <Home />;
};

export default TummyHealth;
