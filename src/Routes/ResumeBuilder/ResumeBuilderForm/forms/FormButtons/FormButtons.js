import { useResumeBuilder } from '../../../../../Providers/ResumeBuilderProvider';
import Button from '../../../../../Components/Button/Button';
import './FormButtons.css';

const FormButtons = ({ onNext }) => {
 const { stage, handleNavigateToPreviousStage } = useResumeBuilder();

 return (
  <div className="form-buttons">
   {stage > 1 ? (
    <Button
     variant="primary"
     title="უკან"
     onClick={handleNavigateToPreviousStage}
    />
   ) : (
    <div />
   )}
   <Button
    variant="primary"
    title={stage == 3 ? 'დასრულება' : 'შემდეგი'}
    onClick={onNext}
   />
  </div>
 );
};

export default FormButtons;
