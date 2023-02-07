import Input from "../../Components/Input/Input"
import Date from "../../Components/Date/Date"
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button"
import { useState } from "react"





const mainformFields = {
 name: 'name'
}




const Main = () => {

 const [state, setState] = useState()
 const [value, setValue] = useState('')
 const [elements, setElements] = useState([])


 const handleClick = () => {
  const newElement = (
   <div key={elements.length + 1}>

    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Date />
    <Date />
    <Input type="text" variant={variant} onChange={onChange} name='name' />
   </div>
  )
  setElements([...elements, newElement])
 }

 const onChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.value });
  setValue(event.target.value);
 };
 console.log(state)

 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 return (
  <div>
   <Form>
    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Date />
    <Date />
    <Input type="text" variant={variant} onChange={onChange} name='name' />
    {elements.map((element) => {
     return element
    })}
    <Button onClick={handleClick} title='add experience' />

   </Form>
  </div>
 )
}


export default Main