import React from 'react';
import './index.css';

const ImagePDF = ({ preview, width}) => {
  return (
    <div className = "pdf" style={{ marginTop: '20px' }}>
      
      {preview ? (
        <iframe
          src={preview}
          frameBorder="0"
          width={width}
          height="600px"
          title="PDF Preview"
        ></iframe>
      ) : (
        ""
      )}
    </div>
  );
};

export default ImagePDF;
