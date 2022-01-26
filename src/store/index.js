import { createStore } from 'vuex'

// 导入vuex持久化
import createPersistedState from "vuex-persistedstate";

import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'


export default createStore({

  modules: {
    user,
    cart,
    category
  },
  // 配置持久化插件
  plugins: [createPersistedState(
    {
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']
    }
  )],
})
