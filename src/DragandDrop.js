import React, { useState, useEffect } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import './index.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
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
        className='draganddrop'
      >
        Drag 'n' Drop, or click to select a file
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          id="fileInput"
        />
      </div>
      {preview && (
        <div style={{ marginTop: '20px' }}>
          <h3>File Preview:</h3>
          <iframe
            src={preview}
            frameBorder="0"
            width="100%"
            height="600px"
            title="PDF Preview">
          </iframe>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
