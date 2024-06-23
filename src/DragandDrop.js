import React, { useState } from 'react';
import './index.css';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    setPreview(URL.createObjectURL(droppedFile));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('File uploaded successfully.');
      console.log(response.data);
    } catch (error) {
      setMessage('Error uploading file.');
      console.error(error);
    }
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
      {preview && (
        <div style={{ marginTop: '20px' }}>
          <h3>File Preview:</h3>
          <iframe
            src={preview}
            frameBorder="0"
            width="100%"
            height="600px"
            title="PDF Preview"
          ></iframe>
        </div>
      )}
      <button onClick={onFileUpload} style={{ marginTop: '20px' }}>Upload</button>
      <p>{message}</p>

      <br></br><br></br><br></br><br></br>
      
    </div>

    
  );
};

export default FileUpload;