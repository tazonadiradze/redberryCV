import './Date.css';

const Date = ({ onChange, label, value, variant, className, ...rest }) => {
 return (
  <div>
   <label className='label'>{label}</label>
   <input
    className={`date-input date-input-variant-${variant} ${className}`}
    type="date"
    value={value}
    onChange={onChange}
    {...rest}
   />
  </div>
 );
};
export default Date;