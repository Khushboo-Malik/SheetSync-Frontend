import React, { useState } from 'react';
import '../Modal.css';


const Modal = ({ validationErrors, onClose }) => {
  // Group the flat array of errors (provided by the backend) by sheet name.
  // Expected error format from backend:
  // [
  //   { sheet: "ActualSheetName1", row: 2, errors: ["Name is required", "Amount must be a valid positive number"] },
  //   { sheet: "ActualSheetName2", row: 3, errors: ["Invalid date format"] },
  //   ...
  // ]
  const grouped = validationErrors.reduce((acc, curr) => {
    const sheetName = curr.sheet;
    if (!acc[sheetName]) {
      acc[sheetName] = [];
    }
    acc[sheetName].push(curr);
    return acc;
  }, {});

  // Convert the grouped object into an array for easier mapping:
  const groupedErrors = Object.keys(grouped).map(sheetName => ({
    sheet: sheetName,
    errors: grouped[sheetName]
  }));

  // State to control the active tab (default to the first sheet)
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Validation Errors</h3>
        
        {/* Tab navigation for each sheet */}
        <div className="tabs">
          {groupedErrors.map((group, index) => (
            <button
              key={index}
              className={`tab-btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {group.sheet} {/* Display the actual sheet name from the backend */}
            </button>
          ))}
        </div>

        {/* Tab content: list the errors for the selected sheet */}
        <div className="tab-content">
          {groupedErrors[activeTab].errors.length === 0 ? (
            <p>No errors found in this sheet.</p>
          ) : (
            groupedErrors[activeTab].errors.map((errorItem, idx) => (
              <div key={idx} className="error-item">
                <strong>Row {errorItem.row}:</strong>
                <span> {errorItem.errors.join(', ')}</span>
              </div>
            ))
          )}
        </div>

        {/* Close button */}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
