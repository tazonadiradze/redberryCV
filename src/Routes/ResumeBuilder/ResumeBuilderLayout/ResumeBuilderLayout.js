import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import Resume from '../../../Components/Resume/Resume';
import './ResumeBuilder.css';

const formStageNames = {
 1: 'პირადი ინფო',
 2: 'გამოცდილება',
 3: 'განათლება',
};
const ResumeBuilderLayout = ({ children }) => {
 const { stage, personal, experiences, educations, isResumeCreated } =
  useResumeBuilder();

 if (isResumeCreated) {
  return (
   <div className="resume-created">
    <Resume
     personal={personal}
     experiences={experiences}
     educations={educations}
    />
    <div>
     <h1>Resume has been created</h1>
    </div>
   </div>
  );
 }

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
    <Resume
     personal={personal}
     experiences={experiences}
     educations={educations}
    />
   </div>
  </div>
 );
};

export default ResumeBuilderLayout;
