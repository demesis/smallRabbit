<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody >
            <tr  v-for="item in $store.getters['cart/validList']" :key="item.skuId" >
              <td><XtxCheckbox @change="$event=>checkOne(item.attrsText,$event)" :modelValue="item.selected" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="">
                  </RouterLink>
                  <div>
                    <RouterLink :to="`/product/${item.id}`">
                      <p class="name ellipsis">{{item.name}}</p>
                      <!-- 选择规格组件 -->
                      <p class="attr">{{item.attrsText}}</p>
                    </RouterLink>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{item.nowPrice}}</p>
                <p v-if="item.price-item.nowPrice>0">
                  比加入时降价
                  <span class="red">&yen;{{item.price-item.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox v-model="item.count"  @change="$event => changeCount(item.attrsText, $event) "/>
              </td>
              <td class="tc"><p class="f16 red">&yen;{{item.nowPrice*100*item.count/100}}</p></td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="deleteCart(item.attrsText)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
            <tr tr v-if="$store.getters['cart/validList'].length===0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <XtxCheckbox :modelValue="$store.getters['cart/isCheckAll']" @change="checkAll">全选</XtxCheckbox>
          <a href="javascript:;" @click="deleteSelected">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validTotal']}} 件商品，已选择 {{$store.getters['cart/selectedTotal']}} 件，商品合计：
          <span class="red">¥{{$store.getters['cart/selectedAmount']}}</span>
          <XtxButton type="primary" @click="goCheckout">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus/lib/components'
import CartNone from './components/cart-none.vue'
import { useRouter } from 'vue-router'
export default {
  name: 'XtxCartPage',
  components: { GoodRelevant,CartNone },
  setup() {
    const store = useStore()
    const checkOne = (attrsText, selected) => {
      store.dispatch('cart/updateGoods', { attrsText, selected })
    }
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAll', selected)
    }
    // 删除
    const deleteCart = (attrsText) => {
      store.dispatch('cart/deleteCart', attrsText).then(() => {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        })
      }).catch(e => {
        ElMessage({
          showClose: true,
          message: '删除失败' + e,
          type: 'warning',
        })
      })
    }
    // 批量删除
    const deleteSelected = () => {
      store.dispatch('cart/deleteSelected').then(() => {
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        })
      }).catch(e => {
        ElMessage({
          showClose: true,
          message: '删除失败' + e,
          type: 'warning',
        })
      })
    }
    // 更改数量
    const changeCount = (attrsText, count) => {
      store.dispatch('cart/updateGoods', { attrsText, count })

    }
    // 跳转结算页面
    const router = useRouter()
    const goCheckout = () => {
      // 1. 判断是否选择有效商品
      // 2. 判断是否已经登录，未登录 弹窗提示
      // 3. 进行跳转 （需要做访问权限控制）
      if (store.getters['cart/selectedTotal'] === 0) return ElMessage({
          showClose: true,
          message: '至少要选中一件商品' ,
          type: 'warning',
        })
      if (!store.state.user.profile.token) {
         router.push('/login')
      }else{
        // router.push('/member/checkout')
        ElMessage({
          showClose: true,
          message: '尚未开发' ,
          type: 'warning',
        })
      }
    }
    return { checkOne, checkAll, deleteCart,deleteSelected,changeCount,goCheckout }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
      &:hover{
        color: @xtxColor;
      }
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,td{
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}

</style>