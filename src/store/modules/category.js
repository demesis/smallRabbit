import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state() {
    return {
      // 分类信息集合,默认设置好，避免刷新请求数据时白屏
      list: topCategory.map(item => ({ name: item }))
    }
  },
  mutations: {

    setList(state, data) {
      state.list = data
    },
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }

  },
  actions: {
    // 获取头部导航信息,解构commit,下方可以直接使用
    async getList({ commit }) {
      const { result } = await findAllCategory()
      result.forEach(item => {
        item.open = false
      })
      commit('setList', result)

    }
  }

}