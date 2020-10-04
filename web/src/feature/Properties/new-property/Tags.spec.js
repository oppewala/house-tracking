import React from 'react';
import { Tags } from './Tags';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/dom';

it('renders without crashing', () => {
  const { getByText } = render(
    <Tags tags={['testtag']} addTag={jest.fn()} removeTag={jest.fn()} />,
  );

  expect(getByText('testtag')).toBeInTheDocument();
});

it('fires add event on enter', () => {
  const mockAddTagHandler = jest.fn();

  render(<Tags tags={[]} addTag={mockAddTagHandler} removeTag={jest.fn()} />);

  const tagInput = screen.getByRole('textbox');
  userEvent.type(tagInput, 'testtag{enter}');

  expect(mockAddTagHandler.mock.calls.length).toBe(1);
  expect(mockAddTagHandler.mock.calls[0][0]).toBe('testtag');
});

it('fires delete event on delete while focused', () => {
  const mockRemoveTagHandler = jest.fn();

  render(<Tags tags={['testtag']} addTag={jest.fn()} removeTag={mockRemoveTagHandler} />);

  const removeIcon = screen.getByRole('button');
  removeIcon.focus();

  fireEvent.keyUp(removeIcon, { key: 'Delete', code: 'Delete' });

  expect(mockRemoveTagHandler.mock.calls.length).toBe(1);
});
