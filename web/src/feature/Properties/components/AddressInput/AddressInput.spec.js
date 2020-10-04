import React from 'react';
import { AddressInput } from './index';
import { render, screen } from '@testing-library/react';

it('Renders', () => {
  const { getByLabelText } = render(<AddressInput address={{}} changeHandler={jest.fn()} />);

  expect(getByLabelText('Address Input')).toBeInTheDocument();
});
