import React, { FC } from 'react';

import Button from 'components/Button';
import Entries from 'components/Entries';
import EntryForm from 'components/EntryForm';
import PageWrapper from 'components/PageWrapper';
import useAuth from 'hooks/useAuth';

const Home: FC = () => {
  const { logout } = useAuth();
  return (
    <PageWrapper name="home">
      <Button onClick={logout}>logout</Button>
      <EntryForm />
      <Entries />
    </PageWrapper>
  );
};

export default Home;
