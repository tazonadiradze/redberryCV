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

 const onChange = (value, name, index) => {
  const updatedEducations = educations.map((item, i) => {
   if (i === index) {
    const next = { ...educations[index], [name]: value };
    return next;
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

 console.log({ educations });
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

 const handleDegreeChange = (event, index) => {
  const selectedIndex = event.target.selectedIndex;
  const selectedValue = event.target.value;
  const degree_id = data[selectedIndex].id;
  handleSaveFormValues(
   'educations',
   educations.map((item, i) => {
    if (i === index) {
     return {
      ...educations[index],
      degree_id: degree_id,
      degree: selectedValue,
     };
    }
    return item;
   })
  );
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
        <div className=" gap-between-inputs">
         <Input
          className="input-size"
          label="სასწავლებელი"
          placeholder="სასწავლებელი"
          onChange={({ target }) => onChange(target.value, 'institute', index)}
          value={eachObj.institute}
          variant={getFieldVariant('institute', index)}
         />
        </div>
        <div className="date-inputs input-margin gap-between-inputs">
         <Select
          className="select-or-date-input-size"
          onChange={(event) => handleDegreeChange(event, index)}
          value={eachObj.degree}
          variant={getFieldVariant('degree', index)}
         >
          {data.map((item) => (
           <option id={item.id}>{item.title}</option>
          ))}
         </Select>
         <Date
          className="select-or-date-input-size"
          onChange={({ target }) => onChange(target.value, 'due_date', index)}
          value={eachObj.due_date}
          variant={getFieldVariant('due_date', index)}
         />
        </div>

        <div className="gap-between-inputs">
         <Input
          className="textarea-size input-margin "
          label="აღწერა"
          placeholder="განათლების აღწერა"
          onChange={({ target }) =>
           onChange(target.value, 'description', index)
          }
          value={eachObj.description}
          variant={getFieldVariant('description', index)}
         />
        </div>
       </div>
      );
     })}
    </div>
    <Button
     className="add-another-one"
     title="სხვა სასწავლებლის დამატება"
     onClick={handleAddAdditional}
    />
    <FormButtons onNext={handleFormSubmit} />
   </Form>
  );
 }
};

export default FormEducation;
