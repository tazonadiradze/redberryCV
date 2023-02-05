import { useState } from "react"
import Button from "../Button/Button"
const Form = ({ onSubmit, initialValue, children }) => {
 return (
  <form >
   {children}


  </form>
 )

}

export default Form