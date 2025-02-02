import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
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
    <div className="container">
      {/* Header Section */}
      <header className="header">
        <h1 className="title">SheetSync</h1>
        <p className="subtitle">
          Effortless Excel Imports, Maximum Efficiency
        </p>
      </header>

      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">Upload Your Excel Sheet</h2>

        {/* Error and Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        {/* File Upload Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="file" className="form-label">
              Choose a file to upload
            </label>
            <input
              type="file"
              id="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="form-input"
            />
          </div>

          {/* Upload Button */}
          <div className="form-button">
            <button type="submit" className="upload-btn">
              Upload File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
