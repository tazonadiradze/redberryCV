import Input from "../../Components/Input/Input"
import './Home.css'
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button";
import { useState } from "react";
import logo from '../../Assets/Vector.png'


const formFields = {
 name: '',
 surname: ''

}





const Home = () => {






 const [state, setState] = useState(formFields)
 const [value, setValue] = useState('');
 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 const { name, surname } = state




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
    <Input type="text" variant={variant} onChange={onChange} name='surname' label='ჩემ შესახებ (არასავალდებულო)' />
    <Input type="email" variant={variant} onChange={onChange} name='surname' label='ელ.ფოსტა' />
    <Input type="tel" variant={variant} onChange={onChange} name='surname' label='მობილურის ნომერი' />


   </Form>
  </div>


 )
}



export default Home