// This folder meant for all kind of validation schemas
const yup = require('yup');

export const personalValidationSchema = yup.object().shape({
 name: yup.string().required(),
 surname: yup.string().required(),
 image: yup.string().required(),
 email: yup.string().required(),
 phone_number: yup.number().required(),
});

export const experienceValidationSchema = yup.object().shape({
 employer: yup.string().required(),
 position: yup.string().required(),
 start_date: yup.string().required(),
 due_date: yup.string().required(),
 description: yup.string().required(),
});

export const experiencesArrayValidationSchema = yup
 .array()
 .of(experienceValidationSchema);

export const educationValidationSchema = yup.object().shape({
 institute: yup.string().required(),
 degree: yup.string().required(),
 due_date: yup.string().required(),
 description: yup.string().required(),
});

export const educationsArrayValidationSchema = yup
 .array()
 .of(educationValidationSchema);
