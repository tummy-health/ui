import React from 'react';
import { render, screen, within } from '@testing-library/react';

import TummyHealth from 'components/TummyHealth';
import { TestProvider } from 'context/App';
import { GET_ENTRIES } from 'hooks/useEntries';
import { GraphQLError } from 'hooks/useQuery';

test('displays entries', async () => {
  const mocks = [
    {
      request: {
        query: GET_ENTRIES,
      },
      result: {
        data: {
          entries: [
            {
              date: '2020-01-01',
              id: 'test-id-1',
              notes: 'notes from the first entry',
              ratingOutOfFive: 2,
            },
            {
              date: '2020-01-02',
              id: 'test-id-2',
              notes: 'notes from the second entry',
              ratingOutOfFive: 4,
            },
          ],
        },
      },
    },
  ];
  render(
    <TestProvider mocks={mocks}>
      <TummyHealth />
    </TestProvider>
  );
  const firstEntryContainer = await screen.findByRole('listitem', {
    name: 'test-id-1',
  });
  const secondEntryContainer = await screen.findByRole('listitem', {
    name: 'test-id-2',
  });
  expect(
    within(firstEntryContainer).getByText(/date: 2020-01-01/)
  ).toBeVisible();
  expect(within(firstEntryContainer).getByText(/rating: 2\/5/)).toBeVisible();
  expect(
    within(firstEntryContainer).getByText(/notes: notes from the first entry/)
  ).toBeVisible();
  expect(
    within(secondEntryContainer).getByText(/date: 2020-01-02/)
  ).toBeVisible();
  expect(within(secondEntryContainer).getByText(/rating: 4\/5/)).toBeVisible();
  expect(
    within(secondEntryContainer).getByText(/notes: notes from the second entry/)
  ).toBeVisible();
});

test('shows loading indicator while entries are loading', async () => {
  render(
    <TestProvider>
      <TummyHealth />
    </TestProvider>
  );
  expect(screen.getByTestId('loading-indicator-entries')).toBeVisible();
});

test('shows error when entries fail to load', async () => {
  const mocks = [
    {
      request: { query: GET_ENTRIES },
      result: {
        errors: [new GraphQLError('error')],
      },
    },
  ];
  render(
    <TestProvider mocks={mocks}>
      <TummyHealth />
    </TestProvider>
  );
  expect(await screen.findByText(/Could not load entries./)).toBeVisible();
});

test('shows message when no entries are saved', async () => {
  const mocks = [
    {
      request: { query: GET_ENTRIES },
      result: {
        data: { entries: [] },
      },
    },
  ];
  render(
    <TestProvider mocks={mocks}>
      <TummyHealth />
    </TestProvider>
  );
  expect(
    await screen.findByText(/You haven't saved any entries yet./)
  ).toBeVisible();
});
