import React, { FC, useState } from 'react';

import Button from 'components/Button';
import DateInput from 'components/DateInput';
import Form from 'components/Form';
import Label from 'components/Label';
import NumericInput from 'components/NumericInput';
import TextInput from 'components/TextInput';
import useSaveEntry from 'hooks/useSaveEntry';

const EntryForm: FC = () => {
  const { isLoading, savedEntry, saveEntry } = useSaveEntry();
  const [date, setDate] = useState<string>();
  const [ratingOutOfFive, setRatingOutOfFive] = useState<number>();
  const [notes, setNotes] = useState<string>();
  return (
    <>
      <Form
        onSubmit={() => {
          if (date && notes && ratingOutOfFive)
            saveEntry({ date, notes, ratingOutOfFive });
        }}
      >
        <Label htmlFor="date">date</Label>
        <DateInput id="date" onChange={setDate} value={date} />
        <Label htmlFor="rating">rating</Label>
        <NumericInput
          id="rating"
          max={5}
          min={1}
          onChange={setRatingOutOfFive}
          value={ratingOutOfFive}
        />
        <Label htmlFor="notes">notes</Label>
        <TextInput id="notes" onChange={setNotes} value={notes} />
        <Button isSubmit isLoading={isLoading}>
          save
        </Button>
      </Form>
      {savedEntry && <p>Saved entry</p>}
    </>
  );
};

export default EntryForm;
