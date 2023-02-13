import { Routes, Route } from 'react-router-dom';
import './fonts.css';
import Home from './Routes/Home/Home';
import ResumeBuilder from './Routes/ResumeBuilder/ResumeBuilder';

import { Fragment } from 'react';

const App = () => {
 return (
  <Fragment>
   <div>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/resume-builder" element={<ResumeBuilder />} />
    </Routes>
   </div>
  </Fragment>
 );
};

export default App;
