
import { Routes, Route, } from 'react-router-dom';
import Home from './routes/home/home';
import Main from './routes/home/Main/Main';
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/main' element={<Main />} />

    </Routes>

  )


}

export default App
