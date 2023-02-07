import Input from "../../Components/Input/Input"
import Date from "../../Components/Date/Date"
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button"
import { useState } from "react"





const mainformFields = {
 employer: '',
 position: '',

}




const Main = () => {

 const [state, setState] = useState(mainformFields)
 const [value, setValue] = useState('')



 const { employer, position, startdate } = state


 const onChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.value });
  setValue(event.target.value);
 };
 console.log(state)

 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 return (
  <div>
   <Form>
    <Input type="text" variant={variant} onChange={onChange} value={position} name='position' />
    <Input type="text" variant={variant} onChange={onChange} value={employer} name='employer' />
    <Date onChange={onChange} value={startdate} name='startdate' />
    <Date />
    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Button title='add experience' />

   </Form>
  </div>

 )



}


export default Main