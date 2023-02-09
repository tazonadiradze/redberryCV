import { useState } from 'react';
import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import { personalValidationSchema } from '../../../../validation/validationSchemas';
import { validateObject } from '../../../../validation/utils';
import FormButtons from './FormButtons/FormButtons';

const formFields = {
 name: '',
 surname: '',
 aboutMe: '',
 email: '',
 number: '',
};

const FormPersonal = () => {
 const { handleSaveFormValues, handleNavigateToNextStage } = useResumeBuilder();
 const [values, setValues] = useState(formFields);
 const [submitted, setSubmitted] = useState(false);
 const [errors, setErrors] = useState({});

 const handleValidationUpdate = async () => {
  const errors = await validateObject(personalValidationSchema, values);
  setErrors(errors);
 };

 const onChange = (name, event) => {
  setValues({ ...values, [name]: event.target.value });
  if (submitted) {
   handleValidationUpdate();
  }
 };

 const handleSubmit = async () => {
  setSubmitted(true);
  const errors = await validateObject(personalValidationSchema, values);
  if (Object.keys(errors)?.length) {
   setErrors(errors);
  } else {
   handleSaveFormValues('personal', values);
   handleNavigateToNextStage();
  }
 };

 const getFieldVariant = (name) => {
  if (!submitted) return 'default';
  return errors[name] ? 'error' : 'success';
 };

 return (
  <div className="wrapper-div">
   <Form initialValue={formFields} onSubmit={() => {}}>
    <Input
     type="text"
     onChange={(event) => onChange('name', event)}
     variant={getFieldVariant('name')}
     label="სახელი"
     value={values.name}
    />
    <Input
     type="text"
     onChange={(event) => onChange('surname', event)}
     variant={getFieldVariant('surname')}
     label="გვარი"
     value={values.surname}
    />
    <Input
     type="text"
     variant={getFieldVariant('aboutMe')}
     onChange={(event) => onChange('aboutMe', event)}
     label="ჩემ შესახებ (არასავალდებულო)"
     value={values.aboutMe}
    />
    <Input
     type="email"
     variant={getFieldVariant('email')}
     onChange={(event) => onChange('email', event)}
     label="ელ.ფოსტა"
     value={values.email}
    />
    <Input
     type="tel"
     variant={getFieldVariant('number')}
     onChange={(event) => onChange('number', event)}
     label="მობილურის ნომერი"
     value={values.number}
    />
    <FormButtons onNext={handleSubmit} />
   </Form>
  </div>
 );
};

export default FormPersonal;
