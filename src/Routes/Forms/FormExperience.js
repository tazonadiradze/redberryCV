import Input from "../../Components/Input/Input"
import Date from "../../Components/Date/Date"
import Form from "../../Components/Form/Form"
import Button from "../../Components/Button/Button"
import { useState } from "react"
import FormEducation from "./FormEducation"




const mainformFields = {
 employer: '',
 position: '',
 start_date: '',
 due_date: '',
 description: ''

}




const FormExperience = () => {

 const [state, setState] = useState([mainformFields])
 const [page, setPage] = useState('')
 const [value, setValue] = useState('')




 if (page === 'education') {
  return <FormEducation />
 }


 const onChange = (e, name, index) => {
  const value = e.target.value;
  const updatedState = state.map((item, i) => {

   if (i === index) {

    return { ...state[index], [name]: value };
   }
   return item
  })

  setState(updatedState)
 };
 console.log(state)

 const variant = value.length > 2 ? 'success' : value.length === 0 ? 'default' : 'error';

 return (
  <div>
   <Form>
    {state.map((eachObj, index) => {
     console.log('each', eachObj)
     return (
      <div>
       <Input type="text" variant={variant} onChange={(event) => onChange(event, 'position', index)} value={eachObj.position} />
       <Input type="text" variant={variant} onChange={(event) => onChange(event, 'employer', index)} value={eachObj.employer} />
       <Date onChange={(event) => onChange(event, 'start_date', index)} value={eachObj.start_date} />
       <Date onChange={(event) => onChange(event, 'due_date', index)} value={eachObj.due_date} />
       <Input onChange={(event) => onChange(event, 'description', index)} value={eachObj.description} />
      </div>
     )
    })}


    <Button onClick={() => setState([...state, mainformFields])} title='add experience' />
    <Button title='next ' onClick={() => setPage('education')} />

   </Form>
  </div>

 )



}


export default FormExperience