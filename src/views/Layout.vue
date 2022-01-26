<template>
  <AppTopnav/>
  <AppHeader/>
  <AppHeaderSticky/>
  <main>
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <Footer/>
</template>

<script>
import AppTopnav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import Footer from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'

export default {
  name: "Layout",
  components: { AppTopnav,AppHeader,Footer,AppHeaderSticky },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
    
  }
  

};
</script>

<style scoped lang='less'>
</style>