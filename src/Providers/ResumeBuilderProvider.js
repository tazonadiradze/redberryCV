import { createContext, useContext, useReducer } from 'react';
import axios from '../Utils/Axios';

export const ResumeBuilderContext = createContext({});

export const useResumeBuilder = () => useContext(ResumeBuilderContext);

const formStages = {
 personal: 1,
 experience: 2,
 education: 3,
};

const initialPersonalValues = {
 name: '',
 surname: '',
 about_me: '',
 email: '',
 phone_number: '',
 image: '',
};

export const initialExperienceValues = {
 employer: '',
 position: '',
 start_date: '',
 due_date: '',
 description: '',
};

export const initialEducationValues = {
 institute: '',
 degree: '',
 due_date: '',
 description: '',
};

const ResumeBuilderProvider = ({ children }) => {
 const [state, setState] = useReducer(
  (oldState, newState) => ({
   ...oldState,
   ...newState,
  }),
  {
   stage: formStages.personal,
   form: {
    personal: initialPersonalValues,
    experiences: [initialExperienceValues],
    educations: [initialEducationValues],
   },
  }
 );
 const handleSaveFormValues = (key, values) => {
  setState({
   form: {
    ...state.form,
    [key]: values,
   },
  });
 };

 const handleNavigateToNextStage = () => {
  if (state.stage < 3) {
   setState({ stage: ++state.stage });
  } else {
   const { experiences, educations, personal } = state.form;
   const payload = {
    experiences,
    educations,
    ...personal,
   };
   console.log({payload})
   axios.post('/cvs', payload);
  }
 };
 const handleNavigateToPreviousStage = () => setState({ stage: --state.stage });

 return (
  <ResumeBuilderContext.Provider
   value={{
    personal: state.form.personal,
    experiences: state.form.experiences,
    educations: state.form.educations,
    form: state.form,
    stage: state.stage,
    handleNavigateToNextStage,
    handleNavigateToPreviousStage,
    handleSaveFormValues,
   }}
  >
   {children}
  </ResumeBuilderContext.Provider>
 );
};

export default ResumeBuilderProvider;
