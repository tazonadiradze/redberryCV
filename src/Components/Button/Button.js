import './Button.css';

//  variant = 'default' | 'primary' | 'secondary'

const Button = ({ title, onClick, className, variant = 'default' }) => {
 return (
  <div onClick={onClick} className={`btn btn-variant-${variant} ${className}`}>
   {title}
  </div>
 );
};

export default Button;
