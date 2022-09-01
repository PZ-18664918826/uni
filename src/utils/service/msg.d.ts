/** 请求错误 */
declare interface RequestError {
  /**
   * 请求服务的错误类型
   * - axios: axios错误：网络错误, 请求超时, 默认的兜底错误
   * - http: 请求成功，响应的状态码非200的错误
   * - backend: 请求成功，响应的状态码为200，由后端定义的业务错误
   */
  type: 'axios' | 'http' | 'backend';
  /** 错误码 */
  code: string | number;
  /** 错误信息 */
  msg: string;
}

/**
  * 显示错误信息
 * @param error - 请求错误
 */
export function showErrorMsg(error: RequestError): void;
