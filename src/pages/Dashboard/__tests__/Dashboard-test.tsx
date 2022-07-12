/**
 * @format
 */

import 'react-native';
import '@testing-library/jest-dom';
import React from 'react';
import Dashboard from '../Dashboard';

// Note: test renderer must be required after react-native.
import {render, screen} from '@testing-library/react-native';

describe('Testing App', () => {
  it('renders correctly with empty data', () => {
    const mockData = null;
    render(<Dashboard listing={mockData} />);

    const emptyLabel = screen.getByTestId('Empty');

    expect(emptyLabel).not.toBeNull();
  });

  it('renders correctly with data', () => {
    const mockData = [{data: {selftext: 'sample'}}];
    render(<Dashboard listing={mockData} />);

    const itemListing = screen.getByTestId('itemList');

    expect(itemListing).not.toBeNull();
  });
});
