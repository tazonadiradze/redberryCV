import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from '../Utils/Axios';
import { getFromLocalStorage, saveToLocalStorage } from '../Utils/Utils';
import { convertToFile } from '../Utils/Utils';
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
 degree_id: null,
 due_date: '',
 description: '',
};

const initialStateValues = {
 isResumeCreated: false,
 stage: formStages.personal,
 form: {
  personal: initialPersonalValues,
  experiences: [initialExperienceValues],
  educations: [initialEducationValues],
 },
};
const ResumeBuilderProvider = ({ children }) => {
 const [state, setState] = useReducer(
  (oldState, newState) => ({
   ...oldState,
   ...newState,
  }),
  initialStateValues
 );

 useEffect(() => {
  const savedState = getFromLocalStorage();
  if (savedState) {
   setState(savedState);
  }
 }, []);

 useEffect(() => {
  if (state !== initialStateValues) {
   saveToLocalStorage(state);
  }
 }, [state]);

 const handleSaveFormValues = (key, values) => {
  setState({
   form: {
    ...state.form,
    [key]: values,
   },
  });
 };

 const handleCreate = async () => {
  const { experiences, educations, personal } = state.form;
  const fileFromURL = await convertToFile(personal.image);
  const payload = {
   experiences,
   educations,
   ...personal,
   image: fileFromURL,
  };

  try {
   await axios.post('/cvs', payload, {
    headers: { 'Content-Type': 'multipart/form-data' },
   });
   setState({ isResumeCreated: true });
  } catch (err) {}
 };

 const handleNavigateToNextStage = () => {
  if (state.stage < 3) {
   setState({ stage: ++state.stage });
  } else {
   handleCreate();
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
    isResumeCreated: state.isResumeCreated,
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
