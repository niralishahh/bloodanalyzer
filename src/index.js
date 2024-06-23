import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AskQuestion from './App';
import DragandDrop from './DragandDrop';
import ImagePDF from './ImagePDF';
import reportWebVitals from './reportWebVitals';
import myImage from './simplymed.jpg'
//import app from '../backend/app.py';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-image">
        <img src={myImage} alt="Logo" className="logo" />
        <h3 className='simplymed'>SimplyMed.</h3>
      </div>
    </header>
  );
};

const MyApp = ({ onFileUpload, filePreview }) => {
  return (
    <div className="upload">
      <h1 className='underline'>Upload Medical Records</h1>

      {/* <div className="container2">
        <div className="vertical2">
          <span>Name:</span>
          <span>Age: </span>
          <span>Sex:</span>
        </div>

        <div className="vertical">
          <input type="text" name="name"></input>
          <input type="number" name="age"></input>
          <select name="sex">
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
  </div> */}

      <br />

      <DragandDrop onFileUpload={onFileUpload} />
      <ImagePDF preview={filePreview} />

      <br></br><br></br><br></br>
      
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
        <p>Leveraging AI, SimplyMed analyzes and simplifies your blood test reports!</p>
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
    <div className='results2'>
      <AskQuestion />
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
