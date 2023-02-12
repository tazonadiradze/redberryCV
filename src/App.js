import { Routes, Route } from 'react-router-dom';
import './fonts.css';

import Home from './Routes/Home/Home';
import ResumeBuilder from './Routes/ResumeBuilder/ResumeBuilder';
import ResumePage from './Routes/ResumePage/ResumePage';

import { Fragment } from 'react';

const App = () => {
 return (
  <Fragment>
   <div>
    <Routes>
     <Route path="/" element={<Home />} />
     <Route path="/resume-builder" element={<ResumeBuilder />} />
     <Route path="/resume" element={<ResumePage />} />
    </Routes>
   </div>
  </Fragment>
 );
};

export default App;
