/*  eslint-disable */
const storyCleaner = (str) => {
  if (str !== undefined) {
    let strArr = str.split(".");
    return strArr[0] + strArr[1];
  }

  return str;
};

export default storyCleaner;
