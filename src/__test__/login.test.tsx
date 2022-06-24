import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TummyHealth from 'components/TummyHealth';
import { TestProvider } from 'context/App';

test('shows login button if user is not logged in', () => {
  render(
    <TestProvider isAuthenticated={false}>
      <TummyHealth />
    </TestProvider>
  );
  expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
});

test('shows home page after login', () => {
  render(
    <TestProvider isAuthenticated={false}>
      <TummyHealth />
    </TestProvider>
  );
  const button = screen.getByRole('button', { name: 'login' });
  userEvent.click(button);
  expect(screen.getByTestId('page-wrapper-home')).toBeInTheDocument();
});
