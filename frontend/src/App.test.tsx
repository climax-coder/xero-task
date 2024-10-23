// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./api', () => ({
  connectToXero: jest.fn(),
  getTenants: jest.fn(),
  fetchBalanceSheet: jest.fn(),
}));

jest.mock('./components/BalanceSheetTable', () => () => <div>Balance Sheet Table</div>);

describe('App Component', () => {
  test('renders the App component', () => {
    render(<App />);

    expect(screen.getByText(/xero integration/i)).toBeInTheDocument();
    expect(screen.getByText(/connect to xero/i)).toBeInTheDocument();
  });
});
