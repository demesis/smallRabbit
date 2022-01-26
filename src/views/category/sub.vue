<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange" />
        <!-- 列表 -->
        <ul v-if="goodsList[0]">
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <div v-else>
          <img src="@/assets/images/none.png" alt="">
          <span class="text">亲，没有更多了</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item.vue";
import { onMounted, ref, watch } from "vue";
import { findSubCategoryGoods } from "@/api/category";
import { useRoute } from "vue-router";
export default {
  name: "SubCategory",
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute();
    // 商品列表数据
    const goodsList = ref([]);
    // 请求携带参数
    let reqParams = {
      page: 1,
      pageSize: 100,
    };
    // 获取数据
    const getData = () => {
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 展开数据并添加
        goodsList.value.push(...result.items);
      });
    };

    onMounted(() => {
      getData();
    });

    // 切换二级分类重新加载
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === "/category/sub/" + newVal) {
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 100,
          };
          getData();
        }
      }
    );
    // 重新加载数据
    const sortChange = (sortParams) => {
      reqParams = { ...reqParams, ...sortParams };
      goodsList.value = [];
      getData();
    };

    return { goodsList, sortChange };
  },
};
</script>

<style scoped lang='less'>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
.none {
    display: flex;
    height: 200px;
    img {
      width: 200px;
      height: 134px;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
</style>