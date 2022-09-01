import { request } from '../request';

/** 查询股票 或者 基金 */
export function searchStock(key, type) {
  return request.get(`/stock/list/`, { params: { key, type } });
}

// 创建组合
export function createGroup(
  stockType,
  parterType,
  userId,
  name,
  stockSumType,
  detailParamList,
  dateStr = '2022-02-23 00:00:00'
) {
  return request.post(`/parter/create/`, {
    stockType,
    parterType,
    userId,
    name,
    stockSumType,
    detailParamList,
    dateStr
  });
}
