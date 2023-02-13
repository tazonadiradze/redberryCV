export const saveToLocalStorage = (state) => {
 localStorage.setItem('state', JSON.stringify(state));
};

export const getFromLocalStorage = () => {
 const state = JSON.parse(localStorage.getItem('state'));
 return state;
};
