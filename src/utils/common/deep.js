export function deepCopy(object) {
  if (object === null || typeof object !== 'object') {
    return object;
  }
  const newData = object instanceof Array ? [] : {};
  // eslint-disable-next-line no-restricted-syntax
  for (const key in object) {
    // eslint-disable-next-line no-prototype-builtins
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] === 'object') {
        newData[key] = this.deepCopy(object[key]);
      } else {
        newData[key] = object[key];
      }
    }
  }
  return newData;
}
