const Date = ({ onChange, label, name, value }) => {
 return (
  <div>
   <label>{label}</label>
   <input
    type='date'
    name={name}
    value={value}

    onChange={onChange}

   />
  </div>

 )

}


export default Date