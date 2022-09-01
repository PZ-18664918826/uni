/* eslint-disable no-console */

/** 打印log */
export function consoleLog(message, ...optionalParams) {
  console.log(message, ...optionalParams);
}

/** 打印警告 */
export function consoleWarn(message, ...optionalParams) {
  console.warn(message, ...optionalParams);
}

/** 打印错误 */
export function consoleError(message, ...optionalParams) {
  console.error(message, ...optionalParams);
}
