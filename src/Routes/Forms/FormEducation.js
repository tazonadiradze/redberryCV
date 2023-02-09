import Input from "../../Components/Input/Input"
import Button from "../../Components/Button/Button"
import Form from "../../Components/Form/Form"
import { useEffect, useState } from "react";


const FormEducation = () => {


 const [data, setData] = useState(null);
 const [error, setError] = useState(null)
 const [loading, setLoading] = useState(false)


 useEffect(() => {
  const fetchData = async () => {
   setLoading(true);
   try {
    const response = await fetch('https://resume.redberryinternship.ge/api/degrees');
    const json = await response.json();
    setData(json);
   } catch (error) {
    setError(error);
   } finally {
    setLoading(false);
   }
  };
  fetchData();
 }, []);

 if (loading) {
  return <div>Loading...</div>;
 }

 if (error) {
  return <div>Error: {error.message}</div>;
 } else {

 }

 if (data) {
  console.log(data)
  return (
   <Form>
    <Input />
    <select>
     {data.map(item => <option key={item.id}>{item.title}</option>)}
    </select>
   </Form>
  )


 }




}


export default FormEducation