import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard heading securely', () => {
  render(<App />);
  const headingElement = screen.getByText(/SecureNotes Portal/i);
  expect(headingElement).toBeInTheDocument();
});