import { useState } from "react"
import Button from "../Button/Button"
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

  </form>
 )

}

export default Form