import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import createGroup from './modules/createGroup';
import getters from './getter';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    createGroup
  },
  getters
});

export default store;
