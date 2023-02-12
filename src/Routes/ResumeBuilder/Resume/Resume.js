import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import resumeLogo from "../../../Assets/resume-logo.svg"
import './Resume.css';

const Resume = () => {
 const { form } = useResumeBuilder();

 const renderPersonalInfo = () => {
  const { personal } = form;

  if (!Object.keys(form.personal).length) return null;
  return (
   <section className="resume-section">
    <h1>{personal.name}{" "}{personal.surname}</h1>
    <h3 className='text'>{personal.aboutMe}</h3>
    <h3 className='text'>{personal.email}</h3>
    <h3 className='text'>{personal.number}</h3>


   </section>
  );
 };

 const renderExperiencesInfo = () => {
  const { experiences } = form;

  if (!experiences.length) return null;
  return experiences.map((experience, i) => {
   const { position, description, employer, start_date, due_date } = experience;

   return (
    <section key={i} className="resume-section">
     <h3 className='text'>position:{position}</h3>
     <h3 className='text'>{employer}</h3>
     <h3 className='text'>{start_date}</h3>
     <h3 className='text'>{due_date}</h3>
     <h3 className='text'>description:{description}</h3>
    </section>
   );
  });
 };


 const renderEducationInfo = () => {
  const { educations } = form
  if (!educations.length) return null
  return educations.map((education, i) => {
   const { institute, due_date, description, degree } = education

   return (
    <section key={i}>
     <h3 className='text'>{institute}</h3>
     <h3 className='text'>{due_date}</h3>
     <h3 className='text'>{description}</h3>
     <h3 className='text'>{degree}</h3>

    </section>
   )
  })
 }

 console.log({ form });

 return (
  <div className="resume">
   <img src={resumeLogo} className="resume-logo" />
   {/* personal form section */}
   {renderPersonalInfo()}

   {/* experiences form section */}
   {renderExperiencesInfo()}

   {/* Educations form section */}

   {form.experiences.length ? (
    <section>
     <h1>Educations info</h1>
     {renderEducationInfo()}
    </section>
   ) : null}
  </div>
 );
};

export default Resume;
