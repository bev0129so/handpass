<template>
    <!-- <el-scrollbar :height="height"></el-scrollbar> -->
    <order-list :order-list="orderList"></order-list>
    <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          background
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :hide-on-single-page="true"
          @current-change="changePage"
      ></el-pagination>
    </div>
</template>

<script setup>
    import OrderList from './OrderList.vue';
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        orderList: {
            type: Array,
            default: () => [],
            required: true
        },
        total: {
            type: Number,
            default: 10
        },
        currentPage: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 5
        },
        height: {
            type: String,
            default: '60px'
        }
    })
    
    const emit = defineEmits(['change-page'])
    const changePage = (val) => {
        //触发父组件
        emit('change-page', val)
    }

</script>
<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
</style>