<template>
  <div id="my-history">
    <el-scrollbar height="500px">
      <order-list :order-list="orderList"></order-list>
    </el-scrollbar>
  </div>
</template>

<script setup>
     import {ref} from 'vue'
     import OrderList from '../../components/content/OrderList.vue';
     import {getHistoryOrder} from '../../network/order'

     const orderList = ref([])

     getHistoryOrder().then((res) => {
        if(res && res.code == 200) {
          orderList.value = res.data
        }else {
          console.log('no history')
          orderList.value = [{
            takeAddress: '123'
          }]
          console.log(orderList.value)
        }
     })

</script>

<style scoped lang='scss'>

</style>