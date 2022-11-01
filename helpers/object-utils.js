export const isEmpty = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const isEmptyDeep = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] && obj[key] !== "") return false;
  }
  return true;
};

/**
 * @method standardizeObject remove null and undefined key
 * @param {Object} obj
 * @returns {Object}
 */
export const standardizeObject = obj => {
  const cloneObj = { ...obj };
  Object.keys(cloneObj).forEach(
    k => (cloneObj[k] == null || cloneObj[k] == undefined) && delete cloneObj[k]
  );
  return cloneObj;
};