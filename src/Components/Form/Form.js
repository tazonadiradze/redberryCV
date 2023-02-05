import { useState } from "react"

const Form = ({ onSubmit, initialValue, children }) => {
 const [value, setValue] = useState(initialValue)

 const handleChange = (event) => {
  setValue({
   ...value,
   [event.target.name]: event.target.value
  })
 }

 const handeSubmit = (event) => {
  event.preventDefault()
  onSubmit(value)
 }

 return (
  <form onSubmit={handeSubmit}>
   {children}
   <button type="submit">test</button>
  </form>
 )

}

export default Form