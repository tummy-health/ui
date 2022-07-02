import React, { FC, useState } from 'react';

import Button from 'components/Button';
import DateInput from 'components/DateInput';
import Form from 'components/Form';
import Label from 'components/Label';
import NumericInput from 'components/NumericInput';
import PageWrapper from 'components/PageWrapper';
import TextInput from 'components/TextInput';
import useSaveEntry from 'hooks/useSaveEntry';
import useAuth from 'hooks/useAuth';

const Home: FC = () => {
  const { logout } = useAuth();
  const { isLoading, savedEntry, saveEntry } = useSaveEntry();
  const [date, setDate] = useState<string>();
  const [rating, setRating] = useState<number>();
  const [notes, setNotes] = useState<string>();
  return (
    <PageWrapper name="home">
      <Button onClick={logout}>logout</Button>
      <Form
        onSubmit={() => {
          if (date && notes && rating)
            saveEntry({ date, maxRating: 5, notes, rating });
        }}
      >
        <Label htmlFor="date">date</Label>
        <DateInput id="date" onChange={setDate} value={date} />
        <Label htmlFor="rating">rating</Label>
        <NumericInput
          id="rating"
          max={5}
          min={1}
          onChange={setRating}
          value={rating}
        />
        <Label htmlFor="notes">notes</Label>
        <TextInput id="notes" onChange={setNotes} value={notes} />
        <Button isSubmit isLoading={isLoading}>
          save
        </Button>
      </Form>
      {savedEntry && <p>Saved entry</p>}
    </PageWrapper>
  );
};

export default Home;
