import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import axios from 'axios';
import LoginView from './loginView';

jest.mock('axios');

describe('LoginComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form and handles user input', async () => {
    // Arrange
    render(<LoginView onLogin={() => { }} onError={() => { }} />);

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'testPassword' } });

    // Assert
    expect(screen.getByLabelText('Username')).toHaveValue('testUser');
    expect(screen.getByLabelText('Password')).toHaveValue('testPassword');
  });

  it('submits form and logs in user on successful response', async () => {
    // Arrange
    const mockOnLogin = jest.fn();
    const mockOnError = jest.fn();
    render(<LoginView onLogin={mockOnLogin} onError={mockOnError} />);

    // Mock the axios post
    axios.post.mockResolvedValueOnce({
      data: {
        status: 'success',
        username: 'omizz',
      },
    });

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'omizz' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: '123' } });
    fireEvent.click(screen.getByText('LOGIN'));

    // Wait for the assertions
    await waitFor(() => {
      // Assert
      expect(axios.post).toHaveBeenCalledWith("http://localhost/index.php/user/login", {
        log_username: 'omizz',
        log_password: '123',
      });
      expect(mockOnLogin).toHaveBeenCalledWith({ username: 'omizz' });
      expect(mockOnError).not.toHaveBeenCalled();
    });
  });

  it('handles error when password is invalid', async () => {
    // Arrange
    const mockOnLogin = jest.fn();
    const mockOnError = jest.fn();
    render(<LoginView onLogin={mockOnLogin} onError={mockOnError} />);

    // Mock the axios post with an error response
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          error: 'invalid password',
          message: 'password does not match that in the database',
        },
        status: 401, // Simulate a 401 status code for this error case
      },
    });

    // Act
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'omizz' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'incorrectPassword' } });
    fireEvent.click(screen.getByText('LOGIN'));

    // Assert
    expect(axios.post).toHaveBeenCalledWith("http://localhost/index.php/user/login", {
      log_username: 'omizz',
      log_password: 'incorrectPassword',
    });

    // Check if the onError prop is called with the expected values
    await waitFor(() => {
      expect(mockOnLogin).not.toHaveBeenCalled();
      expect(mockOnError).toHaveBeenCalledWith({ errorCode: 401, errorMessage: 'invalid password' });
    });
  });
});
