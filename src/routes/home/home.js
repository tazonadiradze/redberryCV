import Input from "../../Components/Input/Input"
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button";
import { useState } from "react";


const formFields = {
 name: '',
 surname: ''
}

const Home = () => {

 const [state, setState] = useState(formFields)
 const [value, setValue] = useState('');

 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 const onChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.value });
  setValue(event.target.value);
 };

 const onSubmitHandler = (event) => {
  event.preventDefault()


 }

 console.log(state)


 return (
  <div>
   <Form initialValue={formFields} onSubmit={() => { }} >

    <Input type="text" variant={variant} onChange={onChange} name='name' />
    <Input type="text" variant={variant} onChange={onChange} name='surname' />
    <Button title='submit' />
   </Form>
  </div>


 )
}



export default Home