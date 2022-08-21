import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TummyHealth from 'components/TummyHealth';
import { TestProvider } from 'context/App';
import { GET_ENTRIES } from 'hooks/useEntries';
import { SAVE_ENTRY_QUERY } from 'hooks/useSaveEntry';

test('submit button shows loading indicator while mutation is pending', () => {
  const mocks = [
    {
      request: {
        query: SAVE_ENTRY_QUERY,
        variables: {
          date: '2020-01-01',
          notes: 'Today I felt great!',
          ratingOutOfFive: 4,
        },
      },
      result: {
        data: {
          saveEntry: {
            date: '2020-01-01',
            id: 'test id',
            notes: 'Today I felt great!',
            ratingOutOfFive: 4,
          },
        },
      },
    },
  ];
  render(
    <TestProvider mocks={mocks}>
      <TummyHealth />
    </TestProvider>
  );
  const date = screen.getByText('date');
  const rating = screen.getByRole('spinbutton', { name: 'rating' });
  const notes = screen.getByRole('textbox', { name: 'notes' });
  const submit = screen.getByRole('button', { name: 'save' });
  userEvent.click(date);
  userEvent.keyboard('2020-01-01');
  userEvent.click(rating);
  userEvent.keyboard('4');
  userEvent.click(notes);
  userEvent.keyboard('Today I felt great!');
  userEvent.click(submit);
  within(submit).getByTestId('loading-indicator-save');
});

test('success text appears after mutation is successful', async () => {
  const mocks = [
    {
      request: {
        query: SAVE_ENTRY_QUERY,
        variables: {
          date: '2020-01-01',
          notes: 'Today I felt great!',
          ratingOutOfFive: 4,
        },
      },
      result: {
        data: {
          saveEntry: {
            date: '2020-01-01',
            id: 'test id',
            notes: 'Today I felt great!',
            ratingOutOfFive: 4,
          },
        },
      },
    },
  ];
  render(
    <TestProvider mocks={mocks}>
      <TummyHealth />
    </TestProvider>
  );
  const date = screen.getByText('date');
  const rating = screen.getByRole('spinbutton', { name: 'rating' });
  const notes = screen.getByRole('textbox', { name: 'notes' });
  const submit = screen.getByRole('button', { name: 'save' });
  userEvent.click(date);
  userEvent.keyboard('2020-01-01');
  userEvent.click(rating);
  userEvent.keyboard('4');
  userEvent.click(notes);
  userEvent.keyboard('Today I felt great!');
  userEvent.click(submit);
  expect(await screen.findByText('Saved entry')).toBeInTheDocument();
});

test('entry appears in list after save', async () => {
  const mocks = [
    {
      request: {
        query: SAVE_ENTRY_QUERY,
        variables: {
          date: '2020-01-01',
          notes: 'Today I felt great!',
          ratingOutOfFive: 4,
        },
      },
      result: {
        data: {
          saveEntry: {
            date: '2020-01-01',
            id: 'test id',
            notes: 'Today I felt great!',
            ratingOutOfFive: 4,
          },
        },
      },
    },
    {
      request: {
        query: GET_ENTRIES,
      },
      result: {
        data: {
          entries: [],
        },
      },
    },
    {
      request: {
        query: GET_ENTRIES,
      },
      result: {
        data: {
          entries: [
            {
              date: '2020-01-01',
              id: 'test-id',
              notes: 'Today I felt great!',
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
  const date = screen.getByText('date');
  const rating = screen.getByRole('spinbutton', { name: 'rating' });
  const notes = screen.getByRole('textbox', { name: 'notes' });
  const submit = screen.getByRole('button', { name: 'save' });
  userEvent.click(date);
  userEvent.keyboard('2020-01-01');
  userEvent.click(rating);
  userEvent.keyboard('4');
  userEvent.click(notes);
  userEvent.keyboard('Today I felt great!');
  userEvent.click(submit);
  const firstEntryContainer = await screen.findByRole('listitem', {
    name: 'test-id',
  });
  expect(
    within(firstEntryContainer).getByText(/date: 2020-01-01/)
  ).toBeVisible();
  expect(within(firstEntryContainer).getByText(/rating: 4\/5/)).toBeVisible();
  expect(
    within(firstEntryContainer).getByText(/notes: Today I felt great!/)
  ).toBeVisible();
});
