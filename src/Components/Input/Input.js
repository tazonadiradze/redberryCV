import './Input.css';
import successIcon from '../../Assets/Vector.png';
import errorIcon from '../../Assets/errormessage.png';
// variant = 'default' | 'success' | 'error'

const Input = ({
 label,
 value,
 name,
 className,
 onChange,
 type = 'text',
 variant = 'default',
 placeholder,
 ...rest
}) => {
 return (
  <div>
   {Boolean(label) && <label className="label">{label}</label>}
   <div className="input-container">
    <input
     className={`input input-variant-${variant} ${className}`}
     type={type}
     value={value}
     name={name}
     onChange={onChange}
     placeholder={placeholder}
     {...rest}
    />
    {variant !== 'default' && (
     <img
      src={variant === 'success' ? successIcon : errorIcon}
      className="input-icon"
     />
    )}
   </div>
  </div>
 );
};

export default Input;
