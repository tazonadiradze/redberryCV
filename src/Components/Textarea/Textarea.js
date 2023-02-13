import './Textarea.css';

const Textarea = ({ label, className, variant, ...rest }) => {
 return (
  <div>
   {Boolean(label) && <label className="label">{label}</label>}
   <textarea
    className={`textarea textarea-variant-${variant} ${className}`}
    {...rest}
   />
  </div>
 );
};

export default Textarea;
