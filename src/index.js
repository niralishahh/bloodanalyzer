import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DragandDrop from './DragandDrop';
import ImagePDF from './ImagePDF';
import reportWebVitals from './reportWebVitals';
import myImage from './green_logo.png';

const Header = () => {
  return (
    <header className="header">
      <img src={myImage} alt="Logo" className="logo" />
      <h3>Fresh Hackers</h3>
    </header>
  );
};

const MyApp = ({ onFileUpload, filePreview }) => {
  return (
    <div className="upload">
      <h1>Upload Medical Records</h1>

      <div className="container2">
        <div className="vertical2">
          <span>Name:</span>
          <span>Age: </span>
          <span>Weight:</span>
          <span>Height:</span>
          <span>Sex:</span>
        </div>

        <div className="vertical">
          <input type="text" name="name"></input>
          <input type="number" name="age"></input>
          <input type="number" name="weight"></input>
          <input type="number" name="height"></input>
          <select name="sex">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
      </div>

      <br />

      <DragandDrop onFileUpload={onFileUpload} />
      <ImagePDF preview={filePreview} />
    </div>
  );
};

const Initial = ({ onGenerate }) => {
  return (
    <div className="results">
      <div className="padding">
        <h1>
          Discover your results with <br /> one click.
        </h1>
        <p>Leveraging unique AI algorithms, Blood analyzes and simplifies your medical records in one click.</p>
        <p className="red">*We are not medical professionals.</p>
        <button className="generate" onClick={onGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
};

const NewComponent = () => {
  return (
    <div className="results2">
      <div className="padding">
        <h1>Results:</h1>
        <h3>Red Flags:</h3>
        <p>
          MCH: Your MCH is too low. This means that you are going to die soon <br />
          RBC: RBC is too high at 100.68. Make sure your oxygen level is fine.
        </p>
        <h3>Next Steps:</h3>
        <p>
          1. Try eating more. <br />
          2. Maybe don’t eat more. <br />
          3. Actually drink more water. <br />
        </p>
        <h3>Extra Links:</h3>
        <p>
          1. <a href="https://www.webmd.com">Webmd.com</a> <br />
          2. <a href="https://www.you.com">You.com</a> <br />
          3. <a href="https://www.help.com">Help.com</a> <br />
        </p>
      </div>
    </div>
  );
};

const MainComponent = () => {
  const [showNewComponent, setShowNewComponent] = useState(false);
  const [showNewComponent2, setShowNewComponent2] = useState(false);
  const [filePreview, setFilePreview] = useState(null);

  const handleGenerateClick = () => {
    setShowNewComponent(true);
    setShowNewComponent2(true);
  };

  const handleFileUpload = (previewURL) => {
    setFilePreview(previewURL);
  };

  return (
    <div className="container">
      {!showNewComponent2 && <MyApp onFileUpload={handleFileUpload} filePreview={filePreview} />}
      {showNewComponent && (
        <div style={{ float: 'left', width: '60%' }}>
          <ImagePDF preview={filePreview} width="100%" />
        </div>
      )}
      {!showNewComponent && <Initial onGenerate={handleGenerateClick} />}
      {showNewComponent && (
        <div style={{ float: 'right', width: '40%'}}>
          <NewComponent />
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <MainComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();