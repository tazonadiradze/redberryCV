// This folder meant for all kind of validation schemas
const yup = require('yup');
const phoneRegExp = /^\+995\d{3}\d{3}\d{3}$/;
export const personalValidationSchema = yup.object().shape({
 name: yup.string().matches(/^[ა-ჰ]+$/, 'Name must contain only Georgian letters').required().min(2),
 surname: yup.string().matches(/^[ა-ჰ]+$/, 'Name must contain only Georgian letters').required().min(2),
 image: yup.string().required(),
 email: yup.string().test('email-validation', 'Invalid email', value => {
  return /@redberry\.ge$/.test(value);
 }).required(),
 phone_number: yup.string().matches(phoneRegExp, 'Invalid Georgian phone number format').required('Phone number is required'),
});


export const experienceValidationSchema = yup.object().shape({
 employer: yup.string().matches(/^[ა-ჰ]+$/, 'employer must contain only Georgian letters').required().min(2),
 position: yup.string().matches(/^[ა-ჰ]+$/, 'position must contain only Georgian letters').required().min(2),
 start_date: yup.string().required(),
 due_date: yup.string().required(),
 description: yup.string().required(),
});

export const experiencesArrayValidationSchema = yup
 .array()
 .of(experienceValidationSchema);

export const educationValidationSchema = yup.object().shape({
 institute: yup.string().matches(/^[ა-ჰ]+$/, 'employer must contain only Georgian letters').required().min(2),
 degree: yup.string().required(),
 due_date: yup.string().required(),
 description: yup.string().required(),
});

export const educationsArrayValidationSchema = yup
 .array()
 .of(educationValidationSchema);
