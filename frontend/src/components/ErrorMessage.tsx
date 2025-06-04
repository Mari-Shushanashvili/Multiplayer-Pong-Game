import React from 'react';
import './ErrorMessage.css';

/**
 * Props interface for the ErrorMessage component.
 */
interface ErrorMessageProps {
  message: string | null;
}

/**
 * The ErrorMessage component displays a user-friendly error message.
 * It only renders if a message is provided.
 * @param {ErrorMessageProps} props - The properties passed to the component.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="error-message-container">
      <p className="error-message-text">{message}</p>
    </div>
  );
};

export default ErrorMessage;