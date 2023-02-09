import { useResumeBuilder } from '../../../Providers/ResumeBuilderProvider';
import './Resume.css';

const Resume = () => {
 const { form } = useResumeBuilder();

 const renderPersonalInfo = () => {
  const { personal } = form;
  if (!Object.keys(form.personal).length) return null;
  return (
   <section className="resume-section">
    <h1>{personal.name}</h1>
    <h3>{personal.email}</h3>
   </section>
  );
 };

 const renderExperiencesInfo = () => {
  const { experiences } = form;
  if (!experiences?.length) return null;
  return experiences.map((experience, i) => {
   const { position, description } = experience;
   return (
    <section key={i} className="resume-section">
     <h3>position:{position}</h3>
     <h3>description:{description}</h3>
    </section>
   );
  });
 };

 console.log({ form });

 return (
  <div className="resume">
   {/* personal form section */}
   {renderPersonalInfo()}

   {/* experiences form section */}
   {renderExperiencesInfo()}

   {/* Educations form section */}

   {form.experiences.length ? (
    <section>
     <h1>Educations info</h1>{' '}
    </section>
   ) : null}
  </div>
 );
};

export default Resume;
