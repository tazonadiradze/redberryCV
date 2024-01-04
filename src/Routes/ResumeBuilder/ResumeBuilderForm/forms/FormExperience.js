import Input from "../../../../Components/Input/Input";
import Date from "../../../../Components/Date/Date";
import Form from "../../../../Components/Form/Form";
import Button from "../../../../Components/Button/Button";
import { useState } from "react";
import {
  useResumeBuilder,
  initialExperienceValues,
} from "../../../../Providers/ResumeBuilderProvider";
import { experiencesArrayValidationSchema } from "../../../../validation/validationSchemas";
import { validateArray } from "../../../../validation/utils";
import FormButtons from "./FormButtons/FormButtons";

const initialTouchedValues = {
  employer: false,
  position: false,
  start_date: false,
  due_date: false,
  description: false,
};

const FormExperience = () => {
  const { handleSaveFormValues, handleNavigateToNextStage, experiences } =
    useResumeBuilder();
  const [touched, setTouched] = useState([initialTouchedValues]);
  const [errors, setErrors] = useState({});

  const handleValidationUpdate = async (validatingValues) => {
    const errors = await validateArray(
      experiencesArrayValidationSchema,
      validatingValues
    );
    setErrors(errors);
  };

  const onChange = (e, name, index) => {
    const value = e.target.value;
    const updatedExperiences = experiences.map((item, i) => {
      if (i === index) {
        return { ...experiences[index], [name]: value };
      }
      return item;
    });

    setTouched((prev) => {
      return prev.map((item, i) => {
        if (i === index) {
          return { ...prev[index], [name]: true };
        }
        return item;
      });
    });
    handleSaveFormValues("experiences", updatedExperiences);
    handleValidationUpdate(updatedExperiences);
  };

  const setAllTouched = () => {
    setTouched((prev) => {
      return prev.map((experience) => {
        const updatedExperience = { ...experience };
        Object.keys(updatedExperience).forEach(
          (key) => (updatedExperience[key] = true)
        );
        return updatedExperience;
      });
    });
  };

  const handleSubmit = async () => {
    setAllTouched();
    handleValidationUpdate(experiences);
    const errors = await validateArray(
      experiencesArrayValidationSchema,
      experiences
    );
    if (Object.keys(errors)?.length) {
      setErrors(errors);
    } else {
      handleNavigateToNextStage();
    }
  };

  const getFieldVariant = (name, i) => {
    if (!touched[i]?.[name]) return "default";
    if (errors[i]) {
      const errorObject = errors[i];
      return errorObject[name] ? "error" : "success";
    }
    return "success";
  };

  const handleAddAdditional = () => {
    setTouched((prev) => [...prev, initialTouchedValues]);
    handleSaveFormValues("experiences", [
      ...experiences,
      initialExperienceValues,
    ]);
  };

  return (
    <div>
      <Form>
        {experiences.map((eachObj, index) => {
          return (
            <div className="Wrapper-div text" key={index}>
              <div className=" gap-between-inputs">
                <Input
                  className="input-size input-margin"
                  label="თანამდებობა"
                  type="text"
                  variant={getFieldVariant("position", index)}
                  onChange={(event) => onChange(event, "position", index)}
                  value={eachObj.position}
                  placeholder="დეველოპერი"
                />
                <p className="grey-text">მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className="gap-between-inputs">
                <Input
                  className="input-size input-margin "
                  label="დამსაქმებელი"
                  type="text"
                  variant={getFieldVariant("employer", index)}
                  onChange={(event) => onChange(event, "employer", index)}
                  value={eachObj.employer}
                  placeholder="დამსაქმებელი"
                />
                <p className="grey-text">მინიმუმ 2 სიმბოლო</p>
              </div>
              <div className="date-inputs input-margin gap-between-inputs">
                <Date
                  label="დაწყების რიცხვი"
                  variant={getFieldVariant("start_date", index)}
                  onChange={(event) => onChange(event, "start_date", index)}
                  value={eachObj.start_date}
                />
                <Date
                  label="დამთავრების რიცხვი"
                  variant={getFieldVariant("due_date", index)}
                  onChange={(event) => onChange(event, "due_date", index)}
                  value={eachObj.due_date}
                />
              </div>
              <div className="gap-between-inputs">
                <Input
                  className="textarea-size input-margin "
                  label="აღწერა"
                  variant={getFieldVariant("description", index)}
                  onChange={(event) => onChange(event, "description", index)}
                  value={eachObj.description}
                  placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
                />
              </div>
            </div>
          );
        })}
        <div className="line-gray"></div>
        <Button
          className="add-another-one"
          onClick={handleAddAdditional}
          title="მეტი გამოცდილების დამატება"
        />
        <div className="FormButtons">
          <FormButtons onNext={handleSubmit} />
        </div>
      </Form>
    </div>
  );
};

export default FormExperience;
