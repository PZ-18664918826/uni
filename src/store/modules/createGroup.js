import { getStock, setStock, removeStock, getFunk, getGroupType, setGroupType } from '@/utils/common/createGroup';

const createGroup = {
  state: {
    stockGlobalList: getStock() || [],
    funkGlobalList: getFunk() || [],
    groupType: getGroupType() || 0
  },
  actions: {},
  mutations: {
    SET_GROUP_TYPE: (state, groupType) => {
      state.groupType = groupType;
      setGroupType(groupType);
    },
    SET_STOCK_GLOBAL_LIST: (state, stockItem) => {
      state.stockGlobalList = [...state.stockGlobalList, stockItem];
      setStock(state.stockGlobalList);
    },
    SET_STOCK_PRICE: (state, stockItem) => {
      state.stockGlobalList = state.stockGlobalList.map(v => {
        const obj = { ...v };
        if (obj.code === stockItem.code) {
          Object.assign(obj, stockItem);
        }
        return obj;
      });
      setStock(state.stockGlobalList);
    },
    REMOVE_STOCK_ITEM: (state, stockItem) => {
      state.stockGlobalList = state.stockGlobalList.filter(v => v.code !== stockItem.code);
      setStock(state.stockGlobalList);
    },
    /** 初始化金额 百分比 */
    INIT_STOCK_PRE_PRICE: state => {
      state.stockGlobalList = state.stockGlobalList.map(v => {
        const obj = { ...v };
        obj.percentage = 0;
        obj.stockNum = 0;
        return obj;
      });
      setStock(state.stockGlobalList);
    },
    CLEAN_STOCK_GLOBAL_LIST: state => {
      state.stockGlobalList = [];
      removeStock();
    }
  }
};
export default createGroup;
