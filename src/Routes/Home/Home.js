import logo from '../../Assets/logo.png';
import Button from '../../Components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import redberryLogo from '../../Assets/redberryLogo.png';

const Home = () => {
 const navigate = useNavigate();

 return (
  <div className="home">
   <img src={redberryLogo} className="redberry-logo" />
   <div className="hr-line"></div>
   <img src={logo} className="home-logo" />
   <Button
    title="რეზიუმეს დამატება"
    onClick={() => navigate('/resume-builder')}
    variant="secondary"
   />
  </div>
 );
};

export default Home;