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
  <div className="wrapper-div text">
   <Form>
    <div className="name-surname">
     <div className="label-name-p-flex text ">
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
     <div className="label-name-p-flex text ">
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
     <Input
      className="input-margin upload-photo"
      type="file"
      onChange={handleImageChange}
      variant={getFieldVariant('image')}
     />
     {personal?.image && <img src={personal.image} alt="Uploaded Image" />}
    </div>
    <div className="textarea-div">
     <Input
      className="textarea input-margin"
      type="text"
      variant={getFieldVariant('aboutMe')}
      onChange={({ target }) => onChange('aboutMe', target.value)}
      label="ჩემ შესახებ (არასავალდებულო)"
      value={personal.aboutMe}
     />
    </div>
    <div className="label-name-p-flex text mail ">
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

    <div className="text">
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
    <FormButtons onNext={handleSubmit} />
   </Form>
  </div>
 );
};

export default FormPersonal;
