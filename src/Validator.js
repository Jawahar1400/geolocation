export const emailValidator = (userName) => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/g;
    return emailRegex.test(userName);
  };
  export const passWordValidator = password =>{
      const passWordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,15}$/ ;
      return passWordRegex.test(password)
  }