import React, { FC } from 'react';

import Button from 'components/Button';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'hooks/useAuth';

const Home: FC = () => {
  const { logout } = useAuth();
  return (
    <PageWrapper name="home">
      <Button onClick={logout}>logout</Button>
      <p>home</p>
    </PageWrapper>
  );
};

export default Home;
