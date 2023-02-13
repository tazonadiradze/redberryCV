import { useState } from 'react';
import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import { personalValidationSchema } from '../../../../Validation/validationSchemas';
import { validateObject } from '../../../../Validation/utils';
import FormButtons from './FormButtons/FormButtons';
import './FormPersonal.css';

const initialTouchedFields = {
 name: false,
 surname: false,
 aboutMe: false,
 email: false,
 phone_number: false,
 image: false,
};

const FormPersonal = () => {
 const { handleSaveFormValues, handleNavigateToNextStage, personal } = useResumeBuilder();
 const [touched, setTouched] = useState(initialTouchedFields);
 const [errors, setErrors] = useState({});

 const handleValidationUpdate = async (validatingValues) => {
  const errors = await validateObject(
   personalValidationSchema,
   validatingValues
  );
  setErrors(errors);
 };

 const onChange = async (name, value) => {
  const newValues = { ...personal, [name]: value };
  setTouched((prev) => ({ ...prev, [name]: true }));
  handleSaveFormValues('personal', newValues);
  handleValidationUpdate(newValues);
 };

 const handleImageChange = (event) => {
  const file = event.target.files[0];
  onChange('image', URL.createObjectURL(file));
 };

 const setAllTouched = () => {
  setTouched((prev) => {
   const updated = { ...prev };
   Object.keys(updated).forEach((key) => (updated[key] = true));
   return updated;
  });
 };
 const handleSubmit = async () => {
  setAllTouched();
  const errors = await validateObject(personalValidationSchema, personal);
  if (Object.keys(errors).length) {
   setErrors(errors);
  } else {
   handleNavigateToNextStage();

  }
 };

 const getFieldVariant = (name) => {
  if (!touched[name]) return 'default';
  return errors[name] ? 'error' : 'success';
 };

 return (
  <div className="text form-personal">
   <Form>
    <div className="name-surname">
     <div className=" ">
      <Input
       className="input-margin"
       label="სახელი"
       type="text"
       onChange={({ target }) => onChange('name', target.value)}
       variant={getFieldVariant('name')}
       value={personal.name}
      />
      <p className="grey-text">მინიმუმ 2 ასო, ქართული ასოები</p>
     </div>
     <div className="">
      <Input
       className="input-margin"
       type="text"
       onChange={({ target }) => onChange('surname', target.value)}
       variant={getFieldVariant('surname')}
       label="გვარი"
       value={personal.surname}
      />
      <p className="grey-text">მინიმუმ 2 ასო, ქართული ასოები</p>
     </div>
    </div>

    <div>
     <div className='upload-photo'>
      <label htmlFor='photo'>პირადი ფოტოს ატვირთვა</label>
      <Input
       name='photo'
       className="input-margin"
       type="file"
       onChange={handleImageChange}
       variant={getFieldVariant('image')}
      />
     </div>
    </div>
    <div className="textarea-margins">
     <Input
      className="textarea-size input-margin"
      type="text"
      variant={getFieldVariant('aboutMe')}
      onChange={({ target }) => onChange('aboutMe', target.value)}
      label="ჩემ შესახებ (არასავალდებულო)"
      value={personal.aboutMe}
     />
    </div>
    <div className="gap-between-inputs">
     <Input
      className="input-size input-margin"
      type="email"
      variant={getFieldVariant('email')}
      onChange={({ target }) => onChange('email', target.value)}
      label="ელ.ფოსტა"
      value={personal.email}
     />
     <p className="grey-text">უნდა მთავრდებოდეს @redberry.ge-ით</p>
    </div>

    <div className='gap-between-inputs'>
     <Input
      className="input-size input-margin"
      type="tel"
      variant={getFieldVariant('phone_number')}
      onChange={({ target }) => onChange('phone_number', target.value)}
      label="მობილურის ნომერი"
      value={personal.phone_number}
     />
     <p className="grey-text">
      უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს
     </p>
    </div>
   </Form>
   <FormButtons onNext={handleSubmit} />
  </div>
 );
};

export default FormPersonal;
