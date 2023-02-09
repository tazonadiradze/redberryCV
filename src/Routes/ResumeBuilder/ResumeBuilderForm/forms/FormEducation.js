import Input from '../../../../Components/Input/Input';
import Form from '../../../../Components/Form/Form';
import { useEffect, useState } from 'react';
import axios from '../../.../../../../Utils/Axios';
import FormButtons from './FormButtons/FormButtons';
import { useResumeBuilder } from '../../../../Providers/ResumeBuilderProvider';

const FormEducation = () => {
 const [data, setData] = useState(null);
 const [values, setValues] = useState();
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const { handleSaveFormValues, handleNavigateToNextStage } = useResumeBuilder();

 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    const result = await axios.get('api/degrees');
    setData(result?.data);
   } catch (error) {
    setError(error);
   } finally {
    setLoading(false);
   }
  };
  fetchData();
 }, []);

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
    <Input />
    <select>
     {data.map((item) => (
      <option key={item.id}>{item.title}</option>
     ))}
    </select>

    <FormButtons onNext={handleFormSubmit} />
   </Form>
  );
 }
};

export default FormEducation;
