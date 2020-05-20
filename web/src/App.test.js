import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders website title', () => {
  const { getByText } = render(<App />);
  const headerElement = getByText('House Tracking');
  expect(headerElement).toBeInTheDocument();
});
