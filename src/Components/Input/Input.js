import './Input.css'

const Input = ({ label, value, name, className, onChange, type = 'text', ...props }) => {
 switch (type) {
  case 'text':
   return (
    <div className={`input-container ${className}`}>
     <input type={type} checked={value} onChange={onChange} {...props} name={name} />
     <label>{label}</label>
    </div>
   );

  case 'email':
   return (
    <div>
     <input type={type} onChange={onChange} {...props} name={name} value={value} />
     <label>{label}</label>
    </div>
   );

  case 'number':
   return (
    <div>
     <input type={type} onChange={onChange} name={name} value={value}  {...props} />
     <label>{label}</label>
    </div>
   );
  case 'date':
   return (
    <div>
     <input type={type} value={value} name={name} onChange={onChange} {...props} />
     <label>{label}</label>
    </div>
   )
  default:
   return (
    <div>
     <label>{label}</label>
     <input type={type} value={value} onChange={onChange} {...props} />
    </div>
   );
 }
};

export default Input;