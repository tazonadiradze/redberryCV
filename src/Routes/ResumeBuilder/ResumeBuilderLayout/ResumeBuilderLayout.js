import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import Resume from '../Resume/Resume';
import './ResumeBuilder.css';

const ResumeBuilderLayout = ({ children }) => {
 const { stage } = useResumeBuilder();



 return (
  <div className="resume-builder">

   <div className="resume-builder-left">
    <div className="resume-builder-header">

     <h2 className='heading2'>გამოცდილება</h2>
     <p>{`${stage}/3`}</p>
    </div>
    <div className="resume-builder-content">{children}</div>
   </div>


   <div className="resume-builder-right">
    <Resume />
   </div>

  </div>
 );
};

export default ResumeBuilderLayout;
