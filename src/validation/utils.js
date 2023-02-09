export const validateObject = async (schema, obj) => {
 try {
  await schema.validate(obj, { abortEarly: false });
  return {};
 } catch (err) {
  const errObj = {};
  err.inner.forEach(({ path, message }) => {
   errObj[path] = message;
  });
  return errObj;
 }
};

export const validateArray = async (schema, array) => {
 try {
  await schema.validate(array, { abortEarly: false });
  return {};
 } catch (err) {
  const errObj = {};
  err.inner.forEach(({ path, message }) => {
   const index = path[1];
   const name = path.split('.')[1];
   if (errObj[index]) {
    errObj[index] = { ...errObj[index], [name]: message };
   } else {
    errObj[index] = { [name]: message };
   }
  });
  return errObj;
 }
};
