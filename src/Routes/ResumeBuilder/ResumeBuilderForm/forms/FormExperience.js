import Input from '../../../../Components/Input/Input';

import Date from '../../../../Components/Date/Date';
import Form from '../../../../Components/Form/Form';
import Button from '../../../../Components/Button/Button';
import { useState } from 'react';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import { experiencesArrayValidationSchema } from '../../../../Validation/validationSchemas';
import { validateArray } from '../../../../Validation/utils';
import FormButtons from './FormButtons/FormButtons';

const mainformFields = {
 employer: '',
 position: '',
 start_date: '',
 due_date: '',
 description: '',
};

const FormExperience = () => {
 const { handleSaveFormValues, handleNavigateToNextStage } = useResumeBuilder();
 const [values, setValues] = useState([mainformFields]);
 const [submitted, setSubmitted] = useState(false);
 const [errors, setErrors] = useState({});

 const handleValidationUpdate = async () => {
  const errors = await validateArray(experiencesArrayValidationSchema, values);
  setErrors(errors);
 };

 const onChange = (e, name, index) => {
  const value = e.target.value;
  const updatedState = values.map((item, i) => {
   if (i === index) {
    return { ...values[index], [name]: value };
   }
   return item;
  });

  setValues(updatedState);
  if (submitted) {
   handleValidationUpdate();
  }
 };

 const handleSubmit = async () => {
  setSubmitted(true);
  const errors = await validateArray(experiencesArrayValidationSchema, values);
  if (Object.keys(errors)?.length) {
   setErrors(errors);
  } else {
   handleSaveFormValues('experiences', values);
   handleNavigateToNextStage();
  }
 };

 const getFieldVariant = (name, i) => {
  if (!submitted) return 'default';
  if (errors[i]) {
   const errorObject = errors[i];
   return errorObject[name] ? 'error' : 'success';
  }
  return 'success';
 };

 return (
  <div>
   <Form>
    {values.map((eachObj, index) => {
     return (
      <div className='Wrapper-div'>

       <Input
        type="text"
        variant={getFieldVariant('position', index)}
        onChange={(event) => onChange(event, 'position', index)}
        value={eachObj.position}
       />
       <Input
        type="text"
        variant={getFieldVariant('employer', index)}
        onChange={(event) => onChange(event, 'employer', index)}
        value={eachObj.employer}
       />

       <Date
        variant={getFieldVariant('start_date', index)}
        onChange={(event) => onChange(event, 'start_date', index)}
        value={eachObj.start_date}
       />
       <Date
        variant={getFieldVariant('due_date', index)}
        onChange={(event) => onChange(event, 'due_date', index)}
        value={eachObj.due_date}
       />
       <Input
        variant={getFieldVariant('description', index)}
        onChange={(event) => onChange(event, 'description', index)}
        value={eachObj.description}
       />
      </div>
     );
    })}

    <Button
     onClick={() => setValues([...values, mainformFields])}
     title="add experience"
    />
    <FormButtons onNext={handleSubmit} />
   </Form>
  </div>
 );
};

export default FormExperience;
