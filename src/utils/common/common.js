/** 防抖获取验证码 */
export function debounce(func, awaitTime) {
  let timer = '';
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => {
    func();
  }, awaitTime);
}
