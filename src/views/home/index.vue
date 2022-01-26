<template>
<div class="home-entry">
  <div class="container">
    <!-- 左侧分类 -->
    <HomeCategory/>
    <!-- 轮播图 -->
    <HomeBanner/>  
  </div>
  <!-- 新鲜好物 -->
  <HomeNew/>
  <HomeHot/>
  <HomeBrand/>
  <HomeProduct/>
  <HomeSpecial/>
</div>
</template>

<script>
import HomeCategory from '@/views/home/components/home-category.vue'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeProduct from './components/home-product.vue'
import HomeSpecial from './components/home-special.vue'
export default {
    name:'Home',
    components: { HomeCategory, HomeBanner,HomeNew,HomeHot,HomeBrand,HomeProduct,HomeSpecial }
    

}
</script>

<style scoped lang='less'>


</style>
