import React from "react";

const Message = ({ error, successMessage }) => {
  return (
    <div>
      {/* Display error message if any */}
      {error && (
        <div className="error-message">
          <strong>Error: </strong>
          {error}
        </div>
      )}

      {/* Display success message if any */}
      {successMessage && (
        <div className="success-message">
          <strong>Success: </strong>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Message;
