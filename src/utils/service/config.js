/**
 * 获取请求头的类型
 * @param {'json' | 'formUrlencoded' | 'formData'} key - 请求头类型的key
 * - json: application/json
 * - formUrlencoded: application/x-www-form-urlencoded
 * - formData: multipart/form-data
 */
export function getRequestContentType(key) {
  const contentTypes = {
    json: 'application/json',
    formUrlencoded: 'application/x-www-form-urlencoded',
    formData: 'multipart/form-data'
  };
  return contentTypes[key];
}

/**
 * * 根据指定类型获取请求头
 * @param {'json' | 'formUrlencoded' | 'formData'} key - 请求头类型的key
 * @returns {{ headers: { 'Content-Type': 'json' | 'formUrlencoded' | 'formData' } }}
 */
export function setRequestHeadersWithContentType(key) {
  return {
    headers: { 'Content-Type': getRequestContentType(key) }
  };
}
