<template>
 <div id="order-list">
    <Order class="order" v-for="order in orderList" :key="order.id" :order="order"></Order>
 </div>
</template>

<script setup>
    import Order from './Order.vue';
    import { defineProps } from 'vue';

    const props = defineProps({
        orderList: {
            type: Array,
            default: () => [],
            required: true
        }
    })
</script>
<style lang="scss" scoped>
.order {
  margin-bottom: 30px;
}
</style>