export const validateEmail = email => {
    const regex = /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
    return regex.test(email);
  };
  
  export const removeWhitespace = text => {
    const regex = /\s/g;
    return text.replace(regex, '');
  };

  export const validateBirthday = birthday => {
    const regex = /^(19[0-9][0-9]|20\d{2})+-(0[0-9]|1[0-2])+-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    return regex.test(birthday);
  };

  export const validatePhonenumber = phoneNumber => {
    const regex = /^01([0|1|6|7|8|9])+-?([0-9]{3,4})+-?([0-9]{4})$/;
    return regex.test(phoneNumber);
  };
  