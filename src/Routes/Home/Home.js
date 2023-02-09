import logo from '../../Assets/logo.png';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
 const navigate = useNavigate();

 return (
  <div className="home">
   <img src={logo} className="home-logo" />
   <Button
    title="რეზიუმეს დამატება"
    onClick={() => navigate('/resume')}
    variant="secondary"
   />
  </div>
 );
};

export default Home;