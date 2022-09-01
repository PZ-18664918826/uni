import {
  setToken,
  getToken,
  getUserInfo,
  setUserInfo,
  getOpenId,
  setOpenId,
  setrRefreshToken,
  getRefreshToken,
  setTabBarIndex,
  getTabBarIndex,
  cleanAuthStorage
} from '@/utils/common/user';
import { loginOut, refreshToken, unbindWeChat } from '@/service/api/auth';
import { uniToHome } from '@/hooks/useRouterPush';

const user = {
  state: {
    userInfo: getUserInfo() || '',
    token: getToken() || '',
    refreshToken: getRefreshToken() || '',
    openId: getOpenId() || '',
    tabBarIndex: getTabBarIndex() || 0
  },
  actions: {
    async LogOut({ state, commit }) {
      const { data, error } = await unbindWeChat(state.openId);
      if (!error && data) {
        const { data: data2, error: error2 } = await loginOut();
        if (!error2 && data2) {
          commit('SET_USER_INFO', '');
          commit('SET_TAB_BARINDEX', 0);
          commit('SET_TOKEN', '');
          commit('SET_OPEN_ID', '');
          commit('SET_REFRSH_TOKEN', '');
          cleanAuthStorage();
          uniToHome();
          setTimeout(() => {
            uni.showToast({
              title: '微信解绑成功',
              icon: 'success'
            });
          }, 100);
        }
      }
    },
    // 刷新token
    async refreshToken({ state, commit, dispatch }, axiosConfig) {
      const { data, error } = await refreshToken(state.refreshToken);
      if (!error) {
        const { access_token: accessToken, refresh_token: refreshToken } = data;
        commit('SET_TOKEN', accessToken);
        commit('SET_REFRSH_TOKEN', refreshToken);
        const config = { ...axiosConfig };
        if (config.headers) {
          config.headers.Authorization = accessToken;
        }
        return config;
      }
      dispatch('LogOut');
      return null;
    },

    // 系统返回的信息储存方式
    sysTemlogin({ commit }, responseData) {
      const { userInfo, openId } = responseData;
      const { access_token: accessToken, refresh_token: refreshToken } = userInfo;
      commit('SET_OPEN_ID', openId);
      commit('SET_USER_INFO', userInfo);
      commit('SET_TOKEN', accessToken);
      commit('SET_REFRSH_TOKEN', refreshToken);
    }
  },
  mutations: {
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo;
      setUserInfo(userInfo);
    },
    SET_TAB_BARINDEX: (state, index) => {
      state.tabBarIndex = index;
      setTabBarIndex(index);
    },
    SET_TOKEN: (state, token) => {
      setToken(token);
      state.token = token;
    },
    SET_OPEN_ID: (state, openId) => {
      setOpenId(openId);
      state.openId = openId;
    },
    SET_REFRSH_TOKEN: (state, refreshToken) => {
      setrRefreshToken(refreshToken);
      state.refreshToken = refreshToken;
    }
  }
};
export default user;
