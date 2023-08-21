import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddBookScreen from './src/components/AddBook';
import * as ReactNavigation from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('AddBookScreen', () => {
  it('renders correctly', () => {
    
    const mockUseNavigation = () => ({
      navigate: jest.fn(),
    });

    ReactNavigation.useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });

    const { getByPlaceholderText, getByText } = render(<AddBookScreen />);
    
    
    const titleInput = getByPlaceholderText('Title');
    const authorInput = getByPlaceholderText('Author');
    const descriptionInput = getByPlaceholderText('Description');
    const uploadButton = getByText('Upload Thumbnail');
    const submitButton = getByText('Submit');
    
    
    expect(titleInput).toBeTruthy();
    expect(authorInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
    expect(uploadButton).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });
});
