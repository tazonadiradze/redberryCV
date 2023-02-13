export const saveToLocalStorage = (state) => {
 localStorage.setItem('state', JSON.stringify(state));
};

export const getFromLocalStorage = () => {
 const state = JSON.parse(localStorage.getItem('state'));
 return state;
};

export const convertToURL = (file) => {
 return new Promise((resolve) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
   resolve(reader.result);
  };
 });
};

export const convertToFile = (url, name = 'profile') => {
 return fetch(url)
  .then((res) => res.blob())
  .then((blob) => new File([blob], name, { type: 'image/jpeg' }));
};
