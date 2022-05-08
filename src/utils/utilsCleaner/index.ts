/*  eslint-disable */
export const nameCleaner = (str: string) => {
  if (str !== undefined) {
    return (
      str
        // Using replace and regex to change HTML source code to plain text
        .replace(/(^\w+:|^)\/\//, "")
        .replace(/&#039;/gim, "'")
        .replace(/&#39;/gim, "'")
        .replace(/&quot;/gim, '"')
        .replace(/&rsquo;/gim, "'")
        .replace(/&amp;/gim, "&")
        .replace(/&ldquo;/gim, '"')
        .replace(/&hellip;/gim, "...")
    );
  }

  return str;
};

export const storyCleaner = (str: string) => {
  if (str !== undefined) {
    let strArr = str.split(".");
    return strArr[0] + strArr[1];
  }

  return str;
};
