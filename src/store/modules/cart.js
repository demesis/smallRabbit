
export default {
    namespaced: true,
    state() {
        return {
            list: []
        }
    },
    mutations: {
        insertCart (state, goods) {
            // 1.是否有相同商品
            const sameIndex = state.list.findIndex(item => item.attrsText === goods.attrsText)
            // 逻辑：有相同的给goods累加数量，删除相同skuId的商品
            if (sameIndex >= 0) {
                goods.count = state.list[sameIndex].count + goods.count
                state.list.splice(sameIndex, 1)
            }
            state.list.unshift(goods)
        },
        // 删除购物车商品
        deleteCart (state, attrsText) {
            const index = state.list.findIndex(item => item.attrsText === attrsText)
            state.list.splice(index, 1)
        },
        updateGoods (state, goods) {
            const updateGoods = state.list.find(item => item.attrsText === goods.attrsText)
            for (const key in goods) {
                // 布尔类型 false 值需要使用
               if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
                  updateGoods[key] = goods[key]
                }
              }

        }
    },
    actions: {
        insertCart ({commit},goods) {
            return new Promise((resolve) => {
                
                    commit('insertCart', goods)
                    resolve()
                
            })
        },
        deleteCart ({commit},attrsText) {
            return new Promise((resolve) => {
                
                    commit('deleteCart', attrsText)
                    resolve()
                
            })
        },
        updateGoods ({commit},goods) {
            return new Promise((resolve) => {
                
                    commit('updateGoods', goods)
                    resolve()
                
            })
        },
        checkAll ({commit,getters}, selected) {
            return new Promise((resolve) => {
                
                    getters.validList.forEach(item => {
                        commit('updateGoods', { attrsText:item.attrsText, selected })
                        resolve()
                    })
                
            })
        },
        deleteSelected ({commit,getters}) {
            return new Promise((resolve) => {
               
                    getters.selectedList.forEach(item => {
                        commit('deleteCart', item.attrsText)
                        resolve()
                    })
                
            })
        }
    },
    getters: {
        // 有效商品列表
        validList (state) {
          return state.list.filter(item => item.isEffective)
        },
        // 有效商品件数
        validTotal (state, getters) {
          return getters.validList.reduce((p, c) => p + c.count, 0)
        },
        // 有效商品总金额
        validAmount (state, getters) {
          return getters.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
        },
        // 是否全选
        isCheckAll (state, getters) {
            return getters.validList.length === getters.selectedList.length && getters.selectedList.length !== 0
        },
        // 选中商品列表
        selectedList (state, getters) {
            return getters.validList.filter(item => item.selected)
        },
        // 选中商品件数
        selectedTotal (state, getters) {
            return getters.selectedList.reduce((p, c) => p + c.count, 0)
        },
        // 选中商品总金额
        selectedAmount (state, getters) {
            return getters.selectedList.reduce((p, c) => p + (c.nowPrice * 100 * c.count), 0) / 100
        },
      },
}