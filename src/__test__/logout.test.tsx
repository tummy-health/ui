import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TummyHealth from 'components/TummyHealth';
import { TestProvider } from 'context/App';

test('shows login page after logout', () => {
  render(
    <TestProvider isAuthenticated>
      <TummyHealth />
    </TestProvider>
  );
  const button = screen.getByRole('button', { name: 'logout' });
  userEvent.click(button);
  expect(screen.getByTestId('page-wrapper-login')).toBeInTheDocument();
});
