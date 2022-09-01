/**
 * 统一失败和成功的请求结果的数据类型
 * @param {RequestError} error - 请求错误
 * @param {any|null} data - 请求数据
 */
export async function handleServiceResult(error, data) {
  if (error) {
    const fail = {
      error,
      data: null
    };
    return fail;
  }
  const success = {
    error: null,
    data
  };
  return success;
}
