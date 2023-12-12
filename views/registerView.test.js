import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RegisterView from './registerView';

jest.mock('axios');

describe('RegisterView Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders register form and handles user input', async () => {
    // Arrange
    render(<RegisterView onRegister={() => { }} onError={() => { }} />);

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPassword' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'testPassword' } });

    // Assert
    expect(screen.getByLabelText('Username')).toHaveValue('testUser');
    expect(screen.getByLabelText('Password')).toHaveValue('testPassword');
    expect(screen.getByLabelText('Confirm Password')).toHaveValue('testPassword');
  });

  it('submits form and registers user on successful response', async () => {
    // Arrange
    const mockOnRegister = jest.fn();
    const mockOnError = jest.fn();
    render(<RegisterView onRegister={mockOnRegister} onError={mockOnError} />);

    // Mock the axios post
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        username: 'newUser',
      },
    });

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('REGISTER'));

    // Wait for the assertions
    await waitFor(() => {
      // Assert
      expect(axios.post).toHaveBeenCalledWith("http://localhost/index.php/user/create", {
        reg_username: 'newUser',
        reg_password: '123',
        c_password: '123',
      });
      expect(mockOnRegister).toHaveBeenCalledWith({ username: 'newUser' });
      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  it('handles error when registration fails', async () => {
    // Arrange
    const mockOnRegister = jest.fn();
    const mockOnError = jest.fn();
    render(<RegisterView onRegister={mockOnRegister} onError={mockOnError} />);

    // Mock the axios post with an error response
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'username_exists',
          message: 'Username already exists in the database',
        },
        status: 400, // Simulate a 400 status code for this error case
      },
    });

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'existingUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('REGISTER'));

    // Assert
    expect(axios.post).toHaveBeenCalledWith("http://localhost/index.php/user/create", {
      reg_username: 'existingUser',
      reg_password: 'password123',
      c_password: 'password123',
    });

    // Check if the onError prop is called with the expected values
    await waitFor(() => {
      expect(mockOnRegister).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith({ errorCode: 400, errorMessage: 'username_exists' });
    });
  });
});
