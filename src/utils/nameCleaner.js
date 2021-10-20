/*  eslint-disable */
const nameCleaner = (str) => {
  if (str !== undefined) {
    return str
      .replace(/(^\w+:|^)\/\//, "")
      .replaceAll("&#039;", "'")
      .replaceAll("&#39;", "'")
      .replaceAll("&quot;", '"')
      .replaceAll("&rsquo;", "'")
      .replaceAll("&amp;", "&")
      .replaceAll("&ldquo;", '"')
      .replaceAll("&hellip;", "...");
  }

  return str;
};

export default nameCleaner;
