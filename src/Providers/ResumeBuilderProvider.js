import { createContext, useContext, useReducer } from 'react';

export const ResumeBuilderContext = createContext({});

export const useResumeBuilder = () => useContext(ResumeBuilderContext);

const formStages = {
    personal: 1,
    experience: 2,
    education: 3,
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
                personal: {},
                experiences: [],
                educations: [],
            },
        }

    );
    console.log(state, 'state')
    const handleSaveFormValues = (key, values) => {
        setState({
            form: {
                ...state.form,
                [key]: values,

            },
        })
    }



    const handleNavigateToNextStage = () => {
        if (state.stage < 3) {
            setState({ stage: ++state.stage });
        } else {
            alert('submit');
            //make request here
            //axios.post("/cvs",state.form)

        }
    };
    const handleNavigateToPreviousStage = () => setState({ stage: --state.stage });

    return (
        <ResumeBuilderContext.Provider
            value={{
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
