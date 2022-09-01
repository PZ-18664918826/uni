import axios from 'axios';
import { REQUEST_TIMEOUT } from '@/config';
import {
  isObject,
  transformRequestData,
  handleAxiosError,
  handleResponseError,
  handleBackendError,
  handleServiceResult
} from '@/utils';
import { getToken } from '@/utils/common/user';
import store from '@/store/index';
import { uniRequestAdapter } from './adaper';
/**
 * 封装axios请求类
 * @author Soybean<honghuangdc@gmail.com>
 */
export default class CustomAxiosInstance {
  backendSuccessCode = 200;

  /**
   * constructor
   * @param {import('axios').AxiosRequestConfig} axiosConfig
   */
  constructor(axiosConfig) {
    const defaultConfig = {
      timeout: REQUEST_TIMEOUT
    };
    axios.defaults.adapter = uniRequestAdapter;
    axios.defaults.timeout = REQUEST_TIMEOUT;
    Object.assign(defaultConfig, axiosConfig);
    this.instance = axios.create(defaultConfig);
    this.setInterceptor();
  }

  /** 设置请求拦截器 */
  setInterceptor() {
    this.instance.interceptors.request.use(
      async config => {
        const handleConfig = { ...config };
        if (handleConfig.headers) {
          // 数据转换
          const contentType = handleConfig.headers['Content-Type'];
          handleConfig.data = await transformRequestData(handleConfig.data, contentType);
          // 设置token
          handleConfig.headers.Authorization = 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0';
          if (getToken()) {
            handleConfig.headers['Blade-Auth'] = `bearer ${getToken()}`;
          }
        }
        return handleConfig;
      },
      axiosError => {
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
    this.instance.interceptors.response.use(
      async response => {
        const { status } = response;

        if (status === 200 || status < 300 || status === 304) {
          const backend = response.data;
          // 后端数据的结果有code和data，进行code判断处理
          if (isObject(backend) && backend.code) {
            // 请求成功
            if (backend.code === this.backendSuccessCode) {
              return handleServiceResult(null, backend.data);
            }

            const error = handleBackendError(backend);
            return handleServiceResult(error, null);
          }

          // 没有直接返回
          return handleServiceResult(null, backend);
        }

        const error = handleResponseError(response);
        return handleServiceResult(error, null);
      },
      async axiosError => {
        if (axiosError.response) {
          const { status, data } = axiosError.response;
          const { msg, code } = data;
          // 刷新token
          if (status === 401) {
            const config = await store.dispatch('refreshToken', axiosError.response.config);
            if (config) {
              return this.instance.request(config);
            }
            const error = {
              type: 'axios',
              code,
              msg
            };
            return handleServiceResult(error, null);
          }
        }
        const error = handleAxiosError(axiosError);
        return handleServiceResult(error, null);
      }
    );
  }
}
