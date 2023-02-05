
import { Routes, Route, } from 'react-router-dom';
import Home from './Routes/Home/Home';
import Main from './Routes/Main/Main';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />

    </Routes>

  )


}

export default App
