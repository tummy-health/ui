import React, { FC } from 'react';

import LoadingIndicator from 'components/LoadingIndicator';
import useEntries from 'hooks/useEntries';

const Entries: FC = () => {
  const { entries, error, isLoading } = useEntries();
  if (isLoading) return <LoadingIndicator name="entries" />;
  if (error) return <p>Could not load entries.</p>;
  if (!entries || entries.length === 0)
    return <p>You haven&apos;t saved any entries yet.</p>;
  return (
    <ul>
      {entries.map(({ date, id, notes, ratingOutOfFive }) => (
        <li aria-label={id} key={id}>
          <p>date: {date}</p>
          <p>rating: {ratingOutOfFive}/5</p>
          <p>notes: {notes}</p>
        </li>
      ))}
    </ul>
  );
};

export default Entries;
