
import { Routes, Route, } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Main from './Routes/Main/Main';
import SubmitPage from './Routes/SubmitPage/SubmitPage';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />
      <Route path='/submit' element={<SubmitPage />} />

    </Routes>

  )


}

export default App
