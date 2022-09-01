import qs from 'qs';
import { isArray } from '../common';
import { getRequestContentType } from './config';

/**
 * 请求数据的转换
 * @param {any} requestData - 请求数据
 * @param {'json' | 'formUrlencoded' | 'formData' | undefined} contentType - 请求头的Content-Type
 */
export async function transformRequestData(requestData, contentType) {
  // application/json类型不处理
  let data = requestData;
  // form类型转换
  if (contentType === getRequestContentType('formUrlencoded')) {
    data = qs.stringify(requestData);
  }

  return data;
}

/**
 * 接口为上传文件的类型时数据转换
 * @param {File[] | File} file - 单文件或多文件
 * @param {string} key - 文件的属性名
 */
export async function transformFile(file, key) {
  const formData = new FormData();
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      file.map(item => {
        formData.append(key, item);
        return true;
      })
    );
  } else {
    // 单文件
    await formData.append(key, file);
  }
  return formData;
}
