import resumeLogo from '../../Assets/resume-logo.svg';
import './Resume.css';

import { useState } from 'react';






const Resume = ({ personal, experiences, educations }) => {

 const renderPersonalInfo = () => {




  if (!Object.keys(personal).length) return null;

  return (
   <section className="resume-section">
    <h1>
     {personal.name} {personal.surname}
    </h1>

    <p className="cv-margin">{personal.email}</p>

    <p className="cv-margin">{personal.phone_number}</p>
    <p className="cv-margin">{personal.aboutMe}</p>
    <img className="cv-image" src={personal.image} />
   </section>

  );
 };

 const renderExperiencesInfo = () => {

  if (!experiences.length) return null;
  return experiences.map((experience, i) => {
   const { position, description, employer, start_date, due_date } = experience;

   return (
    <section key={i} className="resume-section text">
     <div className='flex cv-margin'>
      <p className="">{position}</p>
      <p className="">{employer}</p>
     </div>
     <div className='flex light-grey-text cv-margin'>
      <p className="">{start_date}</p>
      <p className="">{due_date}</p>
     </div>

     <p className=" cv-margin">{description}</p>
    </section>
   );
  });
 };

 const renderEducationInfo = () => {
  if (!educations.length) return null;
  return educations.map((education, i) => {
   const { institute, due_date, description, degree } = education;

   return (
    <section key={i}>
     <p className="text">{institute}</p>
     <p className="text">{due_date}</p>
     <p className="text">{description}</p>
     <p className="text">{degree}</p>
    </section>
   );
  });
 };

 return (
  <div className="resume">
   {/* personal form section */}
   {renderPersonalInfo()}
   {/* experiences form section */}
   {renderExperiencesInfo()}
   {/* Educations form section */}
   {renderEducationInfo()}
  </div>
 );
};

export default Resume;
