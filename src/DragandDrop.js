import React, { useState } from 'react';
import axios from 'axios';
import './index.css';

const DragandDrop = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    const previewURL = URL.createObjectURL(droppedFile);
    setPreview(previewURL);
    onFileUpload(previewURL);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);
    onFileUpload(previewURL);
  };

  const handleClick = () => {
    document.getElementById('fileInput').click();
  };

  const onFileUpload2 = async () => {
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
                  id="fileInput" />
          </div>
          <button onClick={onFileUpload2} style={{ marginTop: '20px' }} className='upload-button'>Upload</button><p>{message}</p>

    </div>
      
  );
};

export default DragandDrop;
