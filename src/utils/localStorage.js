export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  console.log(result, "this is result -- 10");

  let user;
  if (!result) {
    user = null;
  } else {
    try {
      user = JSON.parse(result);
    } catch (error) {
      console.error('Error parsing JSON from localStorage', error);
      user = null;
    }
  }
  return user;
};
