import React, { useState } from "react";
import Message from "./Message";

const FileUpload = ({ onValidationError }) => { // Accept onValidationError prop
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file when the button is used
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile); // Set the file when drag and drop is used
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow drop
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || "Something went wrong!");
        setSuccessMessage(null);
        
        // Pass the validation errors to the parent
        if (result.errors) {
          onValidationError(result.errors); // Trigger the modal with validation errors
        }
      } else {
        const result = await response.json();
        setSuccessMessage(result.message || "File uploaded successfully!");
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      {/* Render error and success messages */}
      <Message error={error} successMessage={successMessage} />

      {/* Drag-and-Drop Section */}
      <div
        className={`drag-drop-area ${file ? "file-dropped" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {file ? (
          <div className="file-info">
            <div className="file-name">{file.name}</div>
            <div className="success-icon">✔️</div>
          </div>
        ) : (
          <p className="drag-drop-text">Drag and drop your file here</p>
        )}
      </div>

      {/* File Upload Fallback Button */}
      <div className="fallback-upload">
        <input
          type="file"
          id="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className="file-input"
        />
        <label htmlFor="file" className="upload-btn">
          Choose File
        </label>
      </div>

      {/* Upload Button */}
      <div className="form-button">
        <button type="submit" className="upload-btn" onClick={handleSubmit}>
          Upload File
        </button>
      </div>
    </>
  );
};

export default FileUpload;
