import { cleanGroupStorage } from './createGroup';

const tokenKey = '_TOKEN_';

/** token相关操作 */
export function setToken(token) {
  uni.setStorageSync(tokenKey, token);
}

export function getToken() {
  return uni.getStorageSync(tokenKey);
}

export function removeToken() {
  return uni.removeStorageSync(tokenKey);
}

const refreshTokenKey = '_REFRESH_TOKEN_';
/** 刷新token操作 */
export function setrRefreshToken(refreshToken) {
  uni.setStorageSync(refreshTokenKey, refreshToken);
}
export function getRefreshToken() {
  return uni.getStorageSync(refreshTokenKey);
}

export function removeRefreshToken() {
  return uni.removeStorageSync(refreshTokenKey);
}

const userInfoKey = '_USER_INFO_';

/** userInofo 相关操作 */
export function getUserInfo() {
  return uni.getStorageSync(userInfoKey);
}

export function setUserInfo(userInfo) {
  uni.setStorageSync(userInfoKey, userInfo);
}

export function removeUserInfo() {
  return uni.removeStorageSync(userInfoKey);
}

const opneIdKey = '_OPEN_ID_';
/** openId相关操作 */
export function getOpenId() {
  return uni.getStorageSync(opneIdKey);
}

export function setOpenId(openId) {
  uni.setStorageSync(opneIdKey, openId);
}

export function removeOpenId() {
  return uni.removeStorageSync(opneIdKey);
}

const clientTypeKey = '_CLIENT_TYPE_';
/** 商店类型相关操作 */
export function getClientType() {
  return uni.getStorageSync(clientTypeKey);
}

export function setClientType(clientTtype) {
  uni.setStorageSync(clientTypeKey, clientTtype);
}

export function removeClientType() {
  return uni.removeStorageSync(clientTypeKey);
}

const tabBarIndexKey = '_TAB_BAR_INDEX_';
export function setTabBarIndex(index) {
  uni.setStorageSync(tabBarIndexKey, index);
}

export function getTabBarIndex() {
  return uni.getStorageSync(tabBarIndexKey);
}

export function removeTabBarIndex() {
  return uni.removeStorageSync(tabBarIndexKey);
}

const withdrawalKey = '_WITHDRAWAL_KEY_';
export function setWithdrawal(index) {
  uni.setStorageSync(withdrawalKey, index);
}

export function getWithdrawal() {
  return uni.getStorageSync(withdrawalKey);
}

export function removeWithdrawal() {
  return uni.removeStorageSync(withdrawalKey);
}

/** 清除所有的缓存 */
export function cleanAuthStorage() {
  uni.clearStorageSync();
}

export function cleanUserStorage() {
  removeOpenId();
  removeRefreshToken();
  removeToken();
  removeOpenId();
  removeUserInfo();
  removeTabBarIndex();
  removeWithdrawal();
  cleanGroupStorage();
}
