import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Books from '../Books';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ books: [
      { id: 1, title: 'Test Book 1', author: 'Author 1', available: true },
      { id: 2, title: 'Test Book 2', author: 'Author 2', available: false },
    ]})
  })
);

describe('Books Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders a list of books', async () => {
    render(<Router><Books token={null} /></Router>);
    
    expect(await screen.findByText('Test Book 1')).toBeInTheDocument();
    expect(await screen.findByText('Test Book 2')).toBeInTheDocument();
  });

  it('filters books based on search input', async () => {
    render(<Router><Books token={null} /></Router>);
    
    await screen.findByText('Test Book 1');
    
    const filterInput = screen.getByPlaceholderText('Filter books by title or author');
    fireEvent.change(filterInput, { target: { value: 'Test Book 1' } });
    
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Book 2')).not.toBeInTheDocument();
  });

  it('shows "Check Out" button only for available books when user is logged in', async () => {
    render(<Router><Books token="fake-token" /></Router>);
    
    await screen.findByText('Test Book 1');
    
    expect(screen.getByText('Check Out')).toBeInTheDocument();
    expect(screen.queryAllByText('Check Out')).toHaveLength(1);
  });
});