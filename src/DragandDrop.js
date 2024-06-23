import React, { useState } from 'react';
import './index.css';

const DragandDrop = ({ onFileUpload }) => {
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    const previewURL = URL.createObjectURL(droppedFile);
    setPreview(previewURL);
    onFileUpload(previewURL);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
    onFileUpload(previewURL);
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
        style={{
          border: '2px dashed #ccc',
          padding: '40px',
          width: '400px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
        className="draganddrop"
      >
        Drag 'n' Drop, or click to select a file
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          id="fileInput"
        />
      </div>
    </div>
  );
};

export default DragandDrop;
