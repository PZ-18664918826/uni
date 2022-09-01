import CustomAxiosInstance from './instance';

/**
 * 创建请求
 * @param {import('axios').AxiosRequestConfig} axiosConfig - axios配置
 */
export function createRequest(axiosConfig) {
  const customInstance = new CustomAxiosInstance(axiosConfig);

  /**
   * 异步promise请求
   * @param {{url: string;method?: RequestMethod;data?: any;axiosConfig?: AxiosRequestConfig;}} param - 请求参数
   * - url: 请求地址
   * - method: 请求方法(默认get)
   * - data: 请求的body的data
   * - axiosConfig: axios配置
   */
  async function asyncRequest(param) {
    const { url } = param;
    const method = param.method || 'get';
    const { instance } = customInstance;
    const res = await getRequestResponse(instance, method, url, param.data, param.axiosConfig);

    return res;
  }

  /**
   * get请求
   * @param {string} url - 请求地址
   * @param {import('axios').AxiosRequestConfig | undefined} config - axios配置
   */
  function get(url, config) {
    return asyncRequest({ url, method: 'get', axiosConfig: config });
  }

  /**
   * post请求
   * @param {string} url - 请求地址
   * @param {any | undefined} data - 请求的body的data
   * @param {import('axios').AxiosRequestConfig | undefined} config - axios配置
   */
  function post(url, data, config) {
    return asyncRequest({ url, method: 'post', data, axiosConfig: config });
  }
  /**
   * put请求
   * @param {string} url - 请求地址
   * @param {any | undefined} data - 请求的body的data
   * @param {import('axios').AxiosRequestConfig | undefined} config - axios配置
   */
  function put(url, data, config) {
    return asyncRequest({ url, method: 'put', data, axiosConfig: config });
  }

  /**
   * delete请求
   * @param {string} url - 请求地址
   * @param {import('axios').AxiosRequestConfig | undefined} config - axios配置
   */
  function handleDelete(url, config) {
    return asyncRequest({ url, method: 'delete', axiosConfig: config });
  }

  return {
    get,
    post,
    put,
    delete: handleDelete
  };
}

/**
 * 获取请求的响应
 * @param {import('axios').AxiosInstance} instance
 * @param {'get' | 'post' | 'put' | 'delete'} method
 * @param {string} url
 * @param {any | undefined} data
 * @param {import('axios').AxiosRequestConfig | undefined} config
 */
async function getRequestResponse(instance, method, url, data, config) {
  let res;
  if (method === 'get' || method === 'delete') {
    res = await instance[method](url, config);
  } else {
    res = await instance[method](url, data, config);
  }
  return res;
}
