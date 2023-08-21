import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddBookScreen from './src/components/AddBook';

describe('AddBookScreen', () => {
  it('renders correctly', () => {
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
