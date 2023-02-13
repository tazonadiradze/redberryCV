import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import Resume from '../../../Components/Resume/Resume';
import './ResumeBuilder.css';
import { useState, useEffect } from 'react';

const formStageNames = {
 1: 'პირადი ინფო',
 2: 'გამოცდილება',
 3: 'განათლება',
};
const ResumeBuilderLayout = ({ children }) => {
 const { stage, personal, experiences, educations, isResumeCreated } = useResumeBuilder();
 const [showDiv, setShowDiv] = useState(true)
 // onbtn click clear localstorage
 const [existingData, setExistingData] = useState(null);
 useEffect(() => {
  const existingDataFromLocalStorage = localStorage.getItem("state");
  setExistingData(existingDataFromLocalStorage);
 }, []);

 const handleButtonClick = () => {
  localStorage.clear();
  setExistingData(null);
  window.location.reload();
  window.location.replace('/');

 };

 // onbtn click clear localstorage

 if (isResumeCreated) {
  return (
   <div className="resume-created">
    <div className='backdiv'>
     <div onClick={handleButtonClick} className='back'>&lt;</div>
    </div>
    <Resume
     personal={personal}
     experiences={experiences}
     educations={educations}

    />


    {
     showDiv && <div>
      <div className='resume-sent'>
       <div className="remove-button" onClick={() => setShowDiv(false)}>X</div>
       <h2>რეზიუმე წარმატებით გაიგზავნა</h2>
      </div>
     </div>
    }



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
