<template>
  <!-- 数据加载请求完再渲染内容 -->
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
       <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="'/category/'+goods.categories[1].id">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="'/category/sub/'+goods.categories[0].id">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images='goods.mainPictures' />
          <GoodsSales/>
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku :goods="goods" />
          <XtxNumbox v-model="num" :label="'数量'"/>
          <XtxButton type="primary" style="margin-top:20px;" @click="insertCart">加入购物车</XtxButton>
        </div>
        
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant  :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs/>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn/>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, provide, ref, watch } from "vue-demi";
import GoodsRelevant from "./components/goods-relevant";
import GoodsImage from "./components/goods-image";
import { useRoute } from "vue-router";
import { findGoods } from "@/api/product";
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
import { ElMessage } from 'element-plus'
import { useStore } from "vuex";
export default {
  name: "XtxGoodsPage",
  components: { GoodsRelevant,GoodsImage,GoodsSales,GoodsName,GoodsSku,GoodsTabs,GoodsHot,GoodsWarn },
  setup() {
    const goods = getGoods();
    const num = ref(1)
    provide('goods',goods)

    const store = useStore()
    // 加入购物车
    const insertCart = () => {
      // 判断是否选择全部属性
      let switchs = false
      let attrsText = ''
      for(let i = 0; i < goods.value.specs.length; i++){
        for(let n = 0; n < goods.value.specs[i].values.length; n++ ){
          if(goods.value.specs[i].values[n].selected){
            switchs = true
            attrsText = attrsText + ' '  +goods.value.specs[i].name  + ':' + goods.value.specs[i].values[n].name
            break
          }
          switchs = false
        }
        if(switchs === false){
          break
        }
      }
      if(switchs == false){
        ElMessage({
          showClose: true,
          message: '规格选择不全',
          type: 'warning',
        })
      }else{
        store.dispatch('cart/insertCart', {
          id: goods.value.id,
          skuId: goods.value.id,
          name: goods.value.name,
          picture: goods.value.mainPictures[0],
          price: goods.value.price,
          nowPrice: goods.value.price,
          count: num.value,
          attrsText: attrsText,
          selected: true,
          isEffective: true,
          stock: goods.value.inventory
        }).then(() => {
          ElMessage({
              showClose: true,
              message: '添加成功',
              type: 'success',
            })
        })
      }
      
    }
    
    return { goods,num,insertCart };
  },
};

const getGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(() => route.params.id, (newVal) => {
      if(newVal){
        findGoods(route.params.id).then( data => {
          goods.value = null 
          // 不能给空后立马赋值，dom更新是异步的，等dom渲染结束后再赋值
          nextTick(() => {
            goods.value = data.result;
          })

      }
      )
      }},{immediate: true})

    return goods
}

</script>

<style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>