<template>
  <div class="xtx-pagination">
      <!-- 数据不足，无法完全实现分页器&nbsp;&nbsp; -->
    <a v-if="myCurrentPage <= 1" href="javascript:;" class="disabled">上一页</a>
    <a v-else href="javascript:;" @click="changePage(myCurrentPage-1)">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      @click="changePage(i)"
      href="javascript:;"
      :class="{ active: i === myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage >= pager.pageCount"
      href="javascript:;"
      class="disabled"
      >下一页</a
    >
    <a v-else href="javascript:;" @click="changePage(myCurrentPage+1)" >下一页</a>
  </div>
</template>
<script>
import { computed, ref } from "vue-demi";
export default {
  name: "XtxPagination",
  setup() {
    // 确定按钮的个数 5
    const count = 5;
    // 确定当前的页码
    const myCurrentPage = ref(4);
    // 总条数，页面大小
    const myTotal = ref(100);
    const myPageSize = ref(10);
    // 其他数据
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      // 起始按钮，结束按钮，按钮数组
      let start = myCurrentPage.value - Math.floor(count / 2);
      let end = start + count - 1;
      // 如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1;
        end = start + count - 1 > pageCount ? pageCount : start + count - 1;
      }
      // 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount;
        start = end - count + 1 < 1 ? 1 : end - count + 1;
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      return { pageCount, start, end, btnArr };
    });
    // 改变页码
    const changePage = (newPage) => {
      myCurrentPage.value = newPage
    }

    return { pager, myCurrentPage, changePage }
  },
};
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>