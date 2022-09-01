import { searchType } from '@/config/common/system';

const getters = {
  /** 用户信息 */
  userInfo: state => state.user.userInfo,
  /** tabbar索引 */
  tabBarIndex: state => state.user.tabBarIndex,
  /** 微信支付需要的openID */
  openId: state => state.user.openId,
  /** 是否已经登录 */
  isLogin: state => Boolean(state.user.token),
  /** 选择的组合类型 */
  groupType: state => state.createGroup.groupType,
  /** 选择的股票类型 */
  stockGlobalList: state => state.createGroup.stockGlobalList,
  /** 选择的基金类型 */
  funkGlobalList: state => state.createGroup.stockGlobalList,
  /** * 是否包含股票或基金 */
  includesGroup: state => code => {
    const { stockGlobalList } = state.createGroup;
    const bool = stockGlobalList.some(v => v.code === code);
    return bool;
  }
};

export default getters;
