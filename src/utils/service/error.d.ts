type ErrorStatus = 'DEFAULT' | 400 | 401 | 403 | 404 | 405 | 408 | 500 | 501 | 502 | 503 | 504 | 505;

/** 请求错误 */
interface RequestError {
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
 * 策略模式
 * [状态, 为true时执行的回调函数]
 */
type StrategyAction = [boolean, () => void];

/** 后端接口返回的数据的类型 */
interface BackendServiceResult<T = any> {
  /** 状态码 */
  code: string | number;
  /** 接口数据 */
  data: T;
  /** 接口消息 */
  message: string;
}

/**
 * 处理axios请求失败的错误
 * @param axiosError - 错误
 */
export function handleAxiosError(axiosError: import('axios').AxiosError): RequestError;

/**
 * 处理请求成功后的错误
 * @param response - 请求的响应
 */
export function handleResponseError(response: import('axios').AxiosError): RequestError;

/**
 * 处理后端返回的错误(业务错误)
 * @param backendResult - 后端接口的响应数据
 */
export function handleBackendError(backendResult: BackendServiceResult): RequestError;
