import './Home.css'

import logo from '../Assets/logo.png'
import Button from '../Components/Button/Button'

import { Fragment, useState } from 'react'
import FormPersonal from '../Routes/Forms/FormPersonal'


const Home = () => {
 const [page, setPage] = useState('')
 if (page === 'personal') {
  return <FormPersonal />
 }

 return (
  <Fragment>
   <div className="Home-div">
    <img src={logo} className='logo' />
    <div onClick={() => setPage('personal')} className='button'>რეზიუმეს დამატება</div>

   </div>


  </Fragment>
 )
}


export default Home