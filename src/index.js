import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DragandDrop from './DragandDrop';
import reportWebVitals from './reportWebVitals';
import myImage from './green_logo.jpg';

const Header = () =>{
  return (
    <header className="header">
      <img src={myImage} alt="Logo" className="logo"/>
      <h3>Fresh Hackers</h3>
    </header>
  )
}

const MyApp = ({ onGenerate }) =>{
  return (
    <><div className='upload'>
      <h1>Upload Medical Records</h1>

      <div className='container2'>
        <div className='vertical2'>
          
          <span>Name:</span> 
          <span>Age: </span>
          <span>Weight:</span> 
          <span>Height:</span>
          <span>Sex:</span> 
        </div>

        <div className='vertical'>
          <input type='text' name='name'></input>
          <input type='int' name='age'></input>
          <input type='int' name='weight'></input>
          <input type='int' name='height'></input>
          <select name='sex'>
            <option value='female'>Female</option>
            <option value='male'>Male</option>
          </select>
        </div>
      </div>

      <br></br>

      <DragandDrop />
      
    </div>
    </>
  );
};

const Initial = ({onGenerate}) =>{
  return(
    <div className='results'>
      <div className ='padding'>
        <h1>Discover your results with <br></br>
        one click.</h1>

        <p>Leveraging unique AI algorithms, Blood analyzes and simplifies your medical records in one click. </p>
        <p className='red'>*We are not medical professionals.</p>

        <button className='generate' onClick={onGenerate}>Generate</button>
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
      <MyApp />
      {!showNewComponent && <Initial onGenerate={handleGenerateClick} />}
      {showNewComponent && <NewComponent />}
    </div>
  );
}

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
