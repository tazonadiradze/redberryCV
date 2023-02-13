import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import Resume from '../../../Components/Resume/Resume';
import { useState } from 'react';
import './ResumeBuilder.css';

const formStageNames = {
 1: 'პირადი ინფო',
 2: 'გამოცდილება',
 3: 'განათლება',
};
const ResumeBuilderLayout = ({ children }) => {
 const { stage, personal, experiences, educations, isResumeCreated } =
  useResumeBuilder();
 const [showSuccess, setShowSuccess] = useState(true);

 const handleButtonClick = () => {
  localStorage.clear();
  window.location.reload();
  window.location.replace('/');
 };

 if (isResumeCreated) {
  return (
   <div className="resume-created">
    <div className="backdiv">
     <div onClick={handleButtonClick} className="back">
      &lt;
     </div>
    </div>
    <Resume
     personal={personal}
     experiences={experiences}
     educations={educations}
    />

    {showSuccess && (
     <div>
      <div className="resume-sent">
       <div className="remove-button" onClick={() => setShowSuccess(false)}>
        X
       </div>
       <h2>რეზიუმე წარმატებით გაიგზავნა</h2>
      </div>
     </div>
    )}
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
