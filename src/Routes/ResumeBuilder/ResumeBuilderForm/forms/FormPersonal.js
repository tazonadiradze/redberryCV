import { useState } from 'react';
import Input from '../../../../Components/Input/Input';
import Textarea from '../../../../Components/Textarea/Textarea';
import Form from '../../../../Components/Form/Form';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';
import { personalValidationSchema } from '../../../../Validation/validationSchemas';
import { validateObject } from '../../../../Validation/utils';
import FormButtons from './FormButtons/FormButtons';
import { convertToURL } from '../../../../Utils/Utils';
import './FormPersonal.css';

const initialTouchedFields = {
 name: false,
 surname: false,
 about_me: false,
 email: false,
 phone_number: false,
 image: false,
};

const FormPersonal = () => {
 const { handleSaveFormValues, handleNavigateToNextStage, personal } =
  useResumeBuilder();
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

 const handleImageChange = async (event) => {
  const file = event.target.files[0];
  const url = await convertToURL(file);
  onChange('image', url);
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
       placeholder="???????????????"
       className="input-margin"
       label="??????????????????"
       type="text"
       onChange={({ target }) => onChange('name', target.value)}
       variant={getFieldVariant('name')}
       value={personal.name}
      />
      <p className="grey-text">????????????????????? 2 ?????????, ????????????????????? ??????????????????</p>
     </div>
     <div className="">
      <Input
       placeholder="?????????????????????"
       className="input-margin"
       type="text"
       onChange={({ target }) => onChange('surname', target.value)}
       variant={getFieldVariant('surname')}
       label="???????????????"
       value={personal.surname}
      />
      <p className="grey-text">????????????????????? 2 ?????????, ????????????????????? ??????????????????</p>
     </div>
    </div>

    <div>
     <div className="upload-photo">
      <label htmlFor="photo">?????????????????? ??????????????? ????????????????????????</label>
      <input
       name="photo"
       className="input-margin"
       type="file"
       onChange={handleImageChange}
       variant={getFieldVariant('image')}
      />
     </div>
    </div>
    <div className="textarea-margins">
     <Textarea
      className="textarea-size input-margin"
      variant={getFieldVariant('aboutMe')}
      onChange={({ target }) => onChange('aboutMe', target.value)}
      label="????????? ????????????????????? (??????????????????????????????????????????)"
      placeholder="?????????????????? ???????????? ???????????? ?????????????????????"
      value={personal.aboutMe}
     />

    </div>
    <div className="gap-between-inputs">
     <Input
      className="input-size input-margin"
      type="email"
      variant={getFieldVariant('email')}
      onChange={({ target }) => onChange('email', target.value)}
      label="??????.???????????????"
      placeholder="anzor666@redberry.ge"
      value={personal.email}
     />
     <p className="grey-text">???????????? ???????????????????????????????????? @redberry.ge-??????</p>
    </div>

    <div className="gap-between-inputs">
     <Input
      className="input-size input-margin"
      type="tel"
      variant={getFieldVariant('phone_number')}
      onChange={({ target }) => onChange('phone_number', target.value)}
      label="??????????????????????????? ??????????????????"
      value={personal.phone_number}
      placeholder="+995551123456"
     />
     <p className="grey-text">
      ???????????? ?????????????????????????????????????????? ????????????????????? ??????????????????????????? ?????????????????? ?????????????????????
     </p>
    </div>
   </Form>
   <div className="FormButtons">
    <FormButtons onNext={handleSubmit} />
   </div>
  </div>
 );
};

export default FormPersonal;
