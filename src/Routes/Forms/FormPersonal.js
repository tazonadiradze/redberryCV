import Input from "../../Components/Input/Input"
import './FormPersonal.css'
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button";
import { useState } from "react";
import FormExperience from "./FormExperience";
import logo from '../../Assets/Vector.png'




const formFields = {
 name: '',
 surname: '',
 aboutMe: '',
 email: '',
 number: ''

}





const FormPersonal = () => {






 const [page, setPage] = useState('')
 const [state, setState] = useState(formFields)
 const [value, setValue] = useState('');
 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 const { name, surname, aboutMe, email, number } = state

 if (page === 'experience') {
  return <FormExperience />
 }



 const onChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.value });
  setValue(event.target.value);
 };

 const onSubmitHandler = (event) => {
  event.preventDefault()


 }


 console.log(state)



 return (
  <div className="wrapper-div">
   <Form initialValue={formFields} onSubmit={() => { }} >

    <Input type="text" variant={variant} onChange={onChange} name='name' label='სახელი' value={name} />
    <Input type="text" variant={variant} onChange={onChange} name='surname' label='გვარი' value={surname} />
    <Input type="text" variant={variant} onChange={onChange} name='aboutMe' label='ჩემ შესახებ (არასავალდებულო)' value={aboutMe} />
    <Input type="email" variant={variant} onChange={onChange} name='email' label='ელ.ფოსტა' value={email} />
    <Input type="tel" variant={variant} onChange={onChange} name='number' label='მობილურის ნომერი' value={number} />
    <Button title='next' onClick={() => setPage('experience')} />
   </Form>



  </div>



 )

}



export default FormPersonal