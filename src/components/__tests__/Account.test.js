import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Account from '../Account';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Navigate: (props) => mockNavigate(props.to),
}));

describe('Account Component', () => {
  it('redirects to login if no token is present', () => {
    render(<Router><Account token={null} /></Router>);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('displays user email and checked out books', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ email: 'test@example.com' }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ reservation: [
          { id: 1, title: 'Checked Out Book 1', author: 'Author 1' },
          { id: 2, title: 'Checked Out Book 2', author: 'Author 2' },
        ]}),
      }));

    render(<Router><Account token="fake-token" /></Router>);

    await waitFor(() => {
      expect(screen.getByText('Email: test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Checked Out Book 1 by Author 1')).toBeInTheDocument();
      expect(screen.getByText('Checked Out Book 2 by Author 2')).toBeInTheDocument();
    });
  });

  it('displays message when no books are checked out', async () => {
    global.fetch = jest.fn()
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ email: 'test@example.com' }),
      }))
      .mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ reservation: [] }),
      }));

    render(<Router><Account token="fake-token" /></Router>);

    await waitFor(() => {
      expect(screen.getByText('You have 0 books checked out.')).toBeInTheDocument();
    });
  });
});