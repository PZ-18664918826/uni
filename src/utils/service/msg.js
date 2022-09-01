import { NO_ERROR_MSG_CODE, ERROR_MSG_DURATION } from '@/config';

/**
 * 错误消息栈，防止同一错误同时出现
 * @type {Map<string | number, string>}
 */
const errorMsgStack = new Map([]);

/**
 * 添加错误消息
 * @param {RequestError} error
 */
function addErrorMsg(error) {
  errorMsgStack.set(error.code, error.msg);
}
/**
 * 去除错误消息
 * @param {RequestError} error
 */
function removeErrorMsg(error) {
  errorMsgStack.delete(error.code);
}
/**
 * 是否有对应的错误消息
 * @param {RequestError} error
 */
function hasErrorMsg(error) {
  return errorMsgStack.has(error.code);
}

/**
 * 显示错误信息
 * @param {RequestError} error
 */
export function showErrorMsg(error) {
  if (!error.msg) return;
  if (!NO_ERROR_MSG_CODE.includes(error.code)) {
    if (!hasErrorMsg(error)) {
      addErrorMsg(error);
      uni.showToast({
        title: error.msg,
        icon: 'none',
        duration: ERROR_MSG_DURATION
      });
      setTimeout(() => {
        removeErrorMsg(error);
      }, ERROR_MSG_DURATION);
    }
  }
}
