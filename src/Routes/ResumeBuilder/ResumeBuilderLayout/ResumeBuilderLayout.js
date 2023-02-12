import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import Resume from '../Resume/Resume';
import './ResumeBuilder.css';

const formStageNames = {
 1: 'Personal',
 2: 'Experiences',
 3: 'Education',
 
};
const ResumeBuilderLayout = ({ children }) => {
 const { stage } = useResumeBuilder();

 return (
  <div className="resume-builder">
   <div className="resume-builder-left">
    <div className="resume-builder-header">
     <h2 className="heading2">{formStageNames[stage]}</h2>
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
