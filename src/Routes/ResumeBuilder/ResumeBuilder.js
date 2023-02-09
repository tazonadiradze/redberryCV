import ResumeBuilderProvider from '../../Providers/ResumeBuilderProvider';
import ResumeBuilderLayout from './ResumeBuilderLayout/ResumeBuilderLayout';
import ResumeBuilderForm from './ResumeBuilderForm/ResumeBuilderForm';

const ResumeBuilder = () => {
 return (
  <ResumeBuilderProvider>
   <ResumeBuilderLayout>
    <ResumeBuilderForm />
   </ResumeBuilderLayout>
  </ResumeBuilderProvider>
 );
};

export default ResumeBuilder;
