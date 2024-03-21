const validatePassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

const validateFullName = (fullName) => {
  const regex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/;
  return regex.test(fullName);
};

const validateUserName = (userName) => {
  const usernameRegex = /^[a-zA-Z0-9](?:[._]?[a-zA-Z0-9]+)*$/;
  return usernameRegex.test(userName);
};

const validateEmail = (email) => {
  const regex =
    /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  return regex.test(email);
};

export { validatePassword, validateFullName, validateUserName, validateEmail };
