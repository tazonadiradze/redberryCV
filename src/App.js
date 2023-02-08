
import { Routes, Route, Form, } from 'react-router-dom';
import FormPersonal from './Routes/Forms/FormPersonal';
import FormEducation from './Routes/Forms/FormEducation';
import FormExperience from './Routes/Forms/FormExperience';

const App = () => {
  return (


    <Routes>
      <Route path='/' element={<FormPersonal />} />
      <Route path='/main' element={<FormEducation />} />
      <Route path='/submit' element={<FormExperience />} />

    </Routes>


  )


}

export default App
