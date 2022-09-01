const EnumDataType = {
  number: '[object Number]',
  string: '[object String]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  object: '[object Object]',
  array: '[object Array]',
  date: '[object Date]',
  regexp: '[object RegExp]',
  set: '[object Set]',
  map: '[object Map]'
};

export function isNumber(data) {
  return Object.prototype.toString.call(data) === EnumDataType.number;
}
export function isString(data) {
  return Object.prototype.toString.call(data) === EnumDataType.string;
}
export function isBoolean(data) {
  return Object.prototype.toString.call(data) === EnumDataType.boolean;
}
export function isNull(data) {
  return Object.prototype.toString.call(data) === EnumDataType.null;
}
export function isUndefined(data) {
  return Object.prototype.toString.call(data) === EnumDataType.undefined;
}
export function isObject(data) {
  return Object.prototype.toString.call(data) === EnumDataType.object;
}
export function isArray(data) {
  return Object.prototype.toString.call(data) === EnumDataType.array;
}
export function isDate(data) {
  return Object.prototype.toString.call(data) === EnumDataType.date;
}
export function isRegExp(data) {
  return Object.prototype.toString.call(data) === EnumDataType.regexp;
}
export function isSet(data) {
  return Object.prototype.toString.call(data) === EnumDataType.set;
}
export function isMap(data) {
  return Object.prototype.toString.call(data) === EnumDataType.map;
}
