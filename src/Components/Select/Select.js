import './Select.css';

const Select = ({
 onChange,
 value,
 variant,
 className,
 children,
 ...rest
}) => {
 return (
  <select
   className={`select-input select-input-variant-${variant} ${className}`}
   onChange={onChange}
   value={value}
   {...rest}
  >
   {children}
  </select>
 );
};
export default Select;
