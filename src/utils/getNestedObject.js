export const getNestedObject = (path, nestedObj) =>
  path.reduce((obj, key) => (obj && obj[key] ? obj[key] : null), nestedObj);
