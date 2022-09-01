/** 股票信息组合存储 */
const stockKey = '_STOCK_';

export function setStock(stockList) {
  uni.setStorageSync(stockKey, stockList);
}

export function getStock() {
  return uni.getStorageSync(stockKey);
}

export function removeStock() {
  return uni.removeStorageSync(stockKey);
}

/** 基金信息组合存储 */
const funkKey = '_FUNK_';

export function setFunk(funkList) {
  uni.setStorageSync(funkKey, funkList);
}

export function getFunk() {
  return uni.getStorageSync(funkKey);
}

export function removeFunk() {
  return uni.removeStorageSync(funkKey);
}

/** 组合类型 */
const groupTypeKey = '_GROUP_TYPE_';

export function setGroupType(groupType) {
  uni.setStorageSync(groupTypeKey, groupType);
}

export function getGroupType() {
  return uni.getStorageSync(groupTypeKey);
}

export function removeGroupType() {
  return uni.removeStorageSync(groupTypeKey);
}

export function cleanGroupStorage() {
  removeFunk();
  removeStock();
}
