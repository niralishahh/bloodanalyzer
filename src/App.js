import {
  BrowserRouter as Router,
  Route,
  Routes
  

} from 'react-router-dom';
import React from "react";

import FileUpload from "./FileUpload";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/home" element={<FileUpload/>}/>
        </Routes>
      </Router>


    </div>
  );
}

export default App;
