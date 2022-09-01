import {
  DEFAULT_REQUEST_ERROR_CODE,
  DEFAULT_REQUEST_ERROR_MSG,
  NETWORK_ERROR_CODE,
  NETWORK_ERROR_MSG,
  REQUEST_TIMEOUT_CODE,
  REQUEST_TIMEOUT_MSG,
  ERROR_STATUS
} from '@/config';
import { exeStrategyActions } from '../common';
import { showErrorMsg } from './msg';

/**
 * 处理axios请求失败的错误
 * @param {import('axios').AxiosError} axiosError - 错误
 */
export function handleAxiosError(axiosError) {
  const error = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };

  const actions = [
    [
      // 网路错误
      axiosError.message === 'Network Error',
      () => {
        Object.assign(error, { code: NETWORK_ERROR_CODE, msg: NETWORK_ERROR_MSG });
      }
    ],
    [
      // 超时错误
      axiosError.code === REQUEST_TIMEOUT_CODE && axiosError.message.includes('网络连接失败'),
      () => {
        Object.assign(error, { code: REQUEST_TIMEOUT_CODE, msg: REQUEST_TIMEOUT_MSG });
      }
    ],
    [
      // 请求不成功的错误
      Boolean(axiosError.response),
      () => {
        const errorCode = axiosError.response?.status || 'DEFAULT';
        const msg = ERROR_STATUS[errorCode];
        Object.assign(error, { code: errorCode, msg });
      }
    ]
  ];

  exeStrategyActions(actions);

  if (axiosError.response) {
    const { status, data } = axiosError.response;
    const { msg, code } = data;
    if (status === 400) {
      error.code = code;
      error.msg = msg;
    }
  }
  uni.hideLoading();
  showErrorMsg(error);
  return error;
}

/**
 * 处理请求成功后的错误
 * @param {import('axios').AxiosResponse} response - 请求的响应
 */
export function handleResponseError(response) {
  const error = {
    type: 'axios',
    code: DEFAULT_REQUEST_ERROR_CODE,
    msg: DEFAULT_REQUEST_ERROR_MSG
  };

  // 请求成功的状态码非200的错误
  const errorCode = response.status;
  const msg = ERROR_STATUS[errorCode] || DEFAULT_REQUEST_ERROR_MSG;
  Object.assign(error, { type: 'backend', code: errorCode, msg });

  showErrorMsg(error);

  return error;
}

/**
 * 处理后端返回的错误(业务错误)
 * @param {BackendServiceResult} backendResult - 后端接口的响应数据
 */
export function handleBackendError(backendResult) {
  const error = {
    type: 'backend',
    code: backendResult.code,
    msg: backendResult.message
  };

  showErrorMsg(error);

  return error;
}
