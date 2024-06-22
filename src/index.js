import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DragandDrop from './DragandDrop';
import reportWebVitals from './reportWebVitals';


const MyApp = ({ onGenerate }) =>{
  return (
    <><div className='upload'>
      <h1>Upload Medical Records</h1>
      <DragandDrop />

      <div>
        <div>
          Name: 
        </div>
        <div>
          <input type='text'></input>
        </div>
      </div>

      <div>
        <div>
          Age:
        </div>

        <div>
        </div>
      </div>

      <button className='generate' onClick={onGenerate}>Generate</button>
    </div>
    </>
  );
};

const Initial = () =>{
  return(
    <div className='results'>
      <div className ='padding'>
        <h1>Discover your results with <br></br>
        one click.</h1>

        <p>Leveraging unique AI algorithms, Blood analyzes and simplifies your medical records in one click. </p>
        <p className='red'>*We are not medical professionals.</p>
      </div>
    </div>
  );
};

const NewComponent = () =>{
  return(
    <div className='results2'>
      <div className='padding'>
        <h1>Results:</h1>
        <h3>Red Flags:</h3>

        <p>MCH: Your MCH is too low. This means that you are going to die soon <br />

          RBC: RBC is too high at 100.68. Make sure your oxygen level is fine. </p>

        <h3>Next Steps:</h3>

        <p>
        1. Try eating more. <br />
        2. Maybe don’t eat more. <br />
        3. Actually drink more water.  <br />
        </p>

        <h3> 
          Extra Links:
        </h3>

        <p>
          1. <a href='webmd.com'>Webmd.com</a> <br />
          2. <a href='webmd.com'>You.com</a> <br />
          3. <a href='webmd.com'>Help.com</a> <br />
        </p>
      </div>
    </div>
  )
}

const MainComponent = () => {
  const [showNewComponent, setShowNewComponent] = useState(false);

  const handleGenerateClick = () => {
    setShowNewComponent(true);
  };

  return (
    <div className="container">
      <MyApp onGenerate={handleGenerateClick} />
      {showNewComponent ? (
        <NewComponent />
      ) : (
        <Initial />
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <MainComponent />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
