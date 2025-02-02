import React, { useState } from "react";
import FileUpload from "./components/FileUpload"; // Import FileUpload component
import Modal from "./components/Modal"; // Import Modal component
import "./index.css";

const App = () => {
  // State for holding the validation errors returned from the backend.
  // When validationErrors is not null, the Modal will be rendered.
  const [validationErrors, setValidationErrors] = useState(null);

  // This function is passed to FileUpload.
  // When FileUpload detects validation errors, it calls onValidationError(errors)
  // with an errors array (as returned by the backend), and we update our state.
  const handleValidationError = (errors) => {
    setValidationErrors(errors);
  };

  return (
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <h1 className="title">SheetSync</h1>
        <p className="subtitle">Effortless Excel Imports, Maximum Efficiency</p>
      </header>

      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">Upload Your Excel Sheet</h2>
        {/* Render the FileUpload component and pass in the onValidationError handler */}
        <FileUpload onValidationError={handleValidationError} />
      </div>

      {/* Modal for Validation Errors */}
      {/* The Modal will render only if validationErrors is not null.
          It receives the errors (which should include the actual sheet names and error details)
          and an onClose function to clear them (hiding the modal). */}
      {validationErrors && (
        <Modal 
          validationErrors={validationErrors} 
          onClose={() => setValidationErrors(null)} 
        />
      )}
    </div>
  );
};

export default App;
