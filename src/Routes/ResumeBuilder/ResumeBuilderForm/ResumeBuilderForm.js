import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import FormPersonal from './forms/FormPersonal';
import FormExperience from './forms/FormExperience';
import FormEducation from './forms/FormEducation';

const ResumeBuilderForm = () => {
 const { stage } = useResumeBuilder();

 switch (stage) {
  case 1:
   return <FormPersonal />;
  case 2:
   return <FormExperience />;
  case 3:
   return <FormEducation />;
  default:
   return null;
 }
};

export default ResumeBuilderForm;
