import React from 'react';
import { Tags } from './Tags';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const { getByText } = render(
    <Tags tags={['testtag']} addTag={jest.fn()} removeTag={jest.fn()} />,
  );
  expect(getByText('testtag')).toBeInTheDocument();
});
