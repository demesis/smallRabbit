<template>
	<!-- 筛选区 -->
   <div class="sub-filter" >
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a :class="{active: brand.id === filterData.brands.selectedBrand}" href="javascript:;" v-for="brand in filterData.brands" :key="brand.id" @click="filterData.brands.selectedBrand = brand.id">{{brand.name}}</a>
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{p.name}}：</div>
      <div class="body">
        <a :class="{active: attr.id === p.selectedAttr}" href="javascript:;" v-for="attr in p.properties" :key="attr.id" @click="p.selectedAttr = attr.id">{{attr.name}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/category'
export default {
  name: 'SubFilter',
  setup() {

      const route = useRoute()
      const filterData = ref([])
      watch(()=>route.params.id, (newVal) => {
          if ( newVal && `/category/sub/${newVal}` === route.path){
            //   发送请求
            findSubCategoryFilter(route.params.id).then(data => {
                // 数据前方加上全部和选中属性
                data.result.brands.selectedBrand = null
                data.result.brands.unshift({id: null, name: '全部'})
                data.result.saleProperties.forEach(item => {
                    item.selectedAttr = null
                    item.properties.unshift({id: null, name: '全部'})
                });
                
                filterData.value = data.result
                
            })
          }
      },{ immediate: true })

      return { filterData }
      
  }

}
</script>
<style scoped lang='less'>
  // 筛选区
  .sub-filter {
    background: #fff;
    padding: 25px;
    .item {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          transition: all .3s;
          display: inline-block;  
          &.active,
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
</style>