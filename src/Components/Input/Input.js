import './Input.css'

const variant = 'default' | 'success' | 'error'
const Input = ({
 label,
 value,
 name,
 className,
 onChange,
 type = 'text',
 variant = 'default',
 ...rest
}) => {
 return (
  <div >
   {Boolean(label) && <label>{label}</label>}
   <input className={`input input-variant-${variant} ${className}`}

    type={type}
    value={value}
    name={name}
    onChange={onChange}
    {...rest}
   />
  </div>
 )



}

export default Input;