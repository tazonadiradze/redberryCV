
import { Routes, Route, } from 'react-router-dom';

import Home from './Home/Home';
import { Fragment, useState } from 'react';

const App = () => {

  return (
    <Fragment>
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>


    </Fragment >
  )

}


export default App
