import React, { FC } from 'react';

import Button from 'components/Button';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'hooks/useAuth';

const Login: FC = () => {
  const { login } = useAuth();
  return (
    <PageWrapper name="login">
      <Button onClick={login}>login</Button>
    </PageWrapper>
  );
};

export default Login;
