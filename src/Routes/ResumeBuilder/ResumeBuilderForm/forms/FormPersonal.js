import { useState } from 'react';
import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import { personalValidationSchema } from '../../../../Validation/validationSchemas';
import { validateObject } from '../../../../Validation/utils';
import FormButtons from './FormButtons/FormButtons';
import './FormPersonal.css'

const formFields = {
 name: '',
 surname: '',
 aboutMe: '',
 email: '',
 number: '',
 image: ''
};

const FormPersonal = () => {

 const [image, setImage] = useState(null);

 const handleChange = (event) => {
  if (submitted) {
   handleValidationUpdate();
  }
  setImage(URL.createObjectURL(event.target.files[0]));
 };



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
  if (Object.keys(errors).length) {
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
  <div className="wrapper-div text">
   <Form initialValue={formFields} onSubmit={() => { }}>
    <div className='name-surname'>
     <div className='label-name-p-flex text '>
      <Input
       className="input-margin"
       label="სახელი"
       type="text"
       onChange={(event) => onChange('name', event)}
       variant={getFieldVariant('name')}
       value={values.name}
      />
      <p className='grey-text'>მინიმუმ 2 ასო, ქართული ასოები</p>
     </div>
     <div className='label-name-p-flex text '>
      <Input className="input-margin"

       type="text"
       onChange={(event) => onChange('surname', event)}
       variant={getFieldVariant('surname')}
       label="გვარი"
       value={values.surname}
      />
      <p className='grey-text'>მინიმუმ 2 ასო, ქართული ასოები</p>
     </div>
    </div>

    <div>
     <Input className=" input-margin upload-photo" type="file" onChange={handleChange} variant={getFieldVariant('image')} />
     {image && <img src={image} alt="Uploaded Image" />}
    </div>

    <div className='textarea-div'>
     <Input
      className="textarea input-margin"
      type="text"
      variant={getFieldVariant('aboutMe')}
      onChange={(event) => onChange('aboutMe', event)}
      label="ჩემ შესახებ (არასავალდებულო)"
      value={values.aboutMe}

     />

    </div>
    <div className='label-name-p-flex text mail '>
     <Input
      className='input-size input-margin'
      type="email"
      variant={getFieldVariant('email')}
      onChange={(event) => onChange('email', event)}
      label="ელ.ფოსტა"
      value={values.email}

     />
     <p className='grey-text'>უნდა მთავრდებოდეს @redberry.ge-ით</p>
    </div>

    <div className='text'>
     <Input
      className='input-size input-margin'
      type="tel"
      variant={getFieldVariant('number')}
      onChange={(event) => onChange('number', event)}
      label="მობილურის ნომერი"
      value={values.number}
     />
     <p className='grey-text'>უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს</p>

    </div>
    <FormButtons onNext={handleSubmit} />
   </Form>
  </div>
 );
};

export default FormPersonal;
