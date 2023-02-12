import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useEffect, useState } from 'react';
import axios from '../../.../../../../Utils/Axios';
import FormButtons from './FormButtons/FormButtons';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import Button from '../../../../Components/Button/Button';
import Date from '../../../../Components/Date/Date';


const educationFormFields = {
 institute: '',
 degree: '',
 due_date: '',
 description: ''
}

const FormEducation = () => {
 const [data, setData] = useState(null);
 const [values, setValues] = useState([educationFormFields]);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const { handleSaveFormValues, handleNavigateToNextStage } = useResumeBuilder();

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    const result = await axios.get('api/degrees');

    setData(result.data);
   } catch (error) {
    setError(error);
   } finally {
    setLoading(false);
   }
  };
  fetchData();
 }, []);


 const onChange = (e, name, index) => {
  const value = e.target.value
  const uptaded = values.map((item, i) => {
   if (i === index) {

    return { ...values[index], [name]: value }
   }
   return item
  })

  setValues(uptaded)
  console.log(uptaded)
 }





 const handleFormSubmit = () => {
  //first validate form
  //submit if valid;
  handleSaveFormValues('educations', values);
  handleNavigateToNextStage();
 };
 if (loading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error.message}</div>;
 } else {
 }


 if (data) {

  return (
   <Form>
    <div>
     {values.map((eachObj, index) => {
      return (
       <div>
        <Input onChange={(event) => onChange(event, 'institute', index)} value={eachObj.institute} />
        <Date onChange={(event) => onChange(event, 'due_date', index)} value={eachObj.due_date} />
        <Input onChange={(event) => onChange(event, 'description', index)} value={eachObj.description} />
        <select onChange={(event) => onChange(event, 'degree', index)} value={eachObj.degree} >
         {data.map((item, index) => (
          <option  >{item.title}  </option>
         ))}
        </select>
       </div>

      )
     })}

    </div>
    <Button title='სხვა სასწავლებლის დამატება' onClick={() => setValues([...values, educationFormFields])} />
    <FormButtons onNext={handleFormSubmit} />
   </Form>

  );
 }
};

export default FormEducation;
