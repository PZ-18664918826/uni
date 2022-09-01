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

/** 自定义的请求成功结果 */
interface SuccessResult<T = any> {
	/** 请求错误 */
	error: null;
	/** 请求数据 */
	data: T;
}

/** 自定义的请求失败结果 */
interface FailedResult {
	/** 请求错误 */
	error: RequestError;
	/** 请求数据 */
	data: null;
}

/** 自定义的请求结果 */
type RequestResult<T = any> = SuccessResult<T> | FailedResult;

/**
  * 统一失败和成功的请求结果的数据类型
 * @param error - 请求错误
 * @param data - 请求数据
 */
export function handleServiceResult(error: RequestError, data: any | null): RequestResult;
