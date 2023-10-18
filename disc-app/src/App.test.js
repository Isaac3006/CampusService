import { render, screen } from '@testing-library/react';
import App from './App';
import AddPage from "./Components/AddPage"

test('renders learn react link', () => {
  render(<AddPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
