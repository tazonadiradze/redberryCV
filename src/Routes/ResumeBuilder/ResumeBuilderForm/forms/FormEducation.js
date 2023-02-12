import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useEffect, useState } from 'react';
import axios from '../../.../../../../Utils/Axios';
import FormButtons from './FormButtons/FormButtons';
import {
 useResumeBuilder,
 initialEducationValues,
} from '../../../../Providers/ResumeBuilderProvider';
import Button from '../../../../Components/Button/Button';
import Date from '../../../../Components/Date/Date';
import Select from '../../../../Components/Select/Select';
import { validateArray } from '../../../../Validation/utils';
import { educationsArrayValidationSchema } from '../../../../Validation/validationSchemas';

const initialTouchedValues = {
 institute: false,
 degree: false,
 due_date: false,
 description: false,
};

const FormEducation = () => {
 const [data, setData] = useState(null);
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const [touched, setTouched] = useState([initialTouchedValues]);
 const [errors, setErrors] = useState({});
 const { handleSaveFormValues, handleNavigateToNextStage, educations } =
  useResumeBuilder();

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    const result = await axios.get('/degrees');
    setData(result.data);
   } catch (error) {
    setError(error);
   } finally {
    setLoading(false);
   }
  };
  fetchData();
 }, []);

 const handleValidationUpdate = async (validatingValues) => {
  const errors = await validateArray(
   educationsArrayValidationSchema,
   validatingValues
  );
  setErrors(errors);
 };

 const onChange = (e, name, index) => {
  const value = e.target.value;
  const updatedEducations = educations.map((item, i) => {
   if (i === index) {
    return { ...educations[index], [name]: value };
   }
   return item;
  });

  setTouched((prev) => {
   return prev.map((item, i) => {
    if (i === index) {
     return { ...prev[index], [name]: true };
    }
    return item;
   });
  });
  handleSaveFormValues('educations', updatedEducations);
  handleValidationUpdate(updatedEducations);
 };

 const getFieldVariant = (name, i) => {
  if (!touched[i]?.[name]) return 'default';
  if (errors[i]) {
   const errorObject = errors[i];
   return errorObject[name] ? 'error' : 'success';
  }
  return 'success';
 };

 const setAllTouched = () => {
  setTouched((prev) => {
   return prev.map((education) => {
    const updatedEducation = { ...education };
    Object.keys(updatedEducation).forEach(
     (key) => (updatedEducation[key] = true)
    );
    return updatedEducation;
   });
  });
 };

 const handleFormSubmit = async () => {
  setAllTouched();
  handleValidationUpdate(educations);
  const errors = await validateArray(
   educationsArrayValidationSchema,
   educations
  );
  if (Object.keys(errors)?.length) {
   setErrors(errors);
  } else {
   handleNavigateToNextStage();
  }
 };

 const handleAddAdditional = () => {
  setTouched((prev) => [...prev, initialTouchedValues]);
  handleSaveFormValues('educations', [...educations, initialEducationValues]);
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
     {educations.map((eachObj, index) => {
      return (
       <div>
        <Input
         onChange={(event) => onChange(event, 'institute', index)}
         value={eachObj.institute}
         variant={getFieldVariant('institute', index)}
        />
        <Date
         onChange={(event) => onChange(event, 'due_date', index)}
         value={eachObj.due_date}
         variant={getFieldVariant('due_date', index)}
        />
        <Input
         onChange={(event) => onChange(event, 'description', index)}
         value={eachObj.description}
         variant={getFieldVariant('description', index)}
        />
        <Select
         onChange={(event) => onChange(event, 'degree', index)}
         value={eachObj.degree}
         variant={getFieldVariant('degree', index)}
        >
         {data.map((item, index) => (
          <option key={index}>{item.title} </option>
         ))}
        </Select>
       </div>
      );
     })}
    </div>
    <Button title="სხვა სასწავლებლის დამატება" onClick={handleAddAdditional} />
    <FormButtons onNext={handleFormSubmit} />
   </Form>
  );
 }
};

export default FormEducation;
