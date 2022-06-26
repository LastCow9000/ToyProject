import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/run docker!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders2', () => {
  render(<App />);
  const linkElement = screen.getByText(/run/i);
  expect(linkElement).toBeInTheDocument();
});
