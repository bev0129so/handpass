<template>
    <div id="my-published">
        <OrderPage :order-list="orderList" :total="total" :current-page="currentPage" :page-size="pageSize" @change-page="changePage"></OrderPage>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { publishedOrders } from "../../network/order.js";
import OrderPage from '../../components/content/OrderPage.vue';
import { reactive, toRefs, onMounted } from 'vue';
const store = useStore()
const data = reactive({
    orderList: [],
    total: 4,
    currentPage: 1,
    pageSize: 2
})

const getList = () => {
    data.total = 4;
    let tdata = [
        {
            orderId: 1,
            receiverId: 2,
            publisherId: 18,
            price: 10,
            takeAddress: 'Washinton',
            sendAddress: 'here',
            orderNote: 'quick plz',
            orderStatus: 1
        },
        {
            orderId: 1,
            receiverId: 2,
            publisherId: 18,
            price: 10,
            takeAddress: 'Washinton',
            sendAddress: 'here',
            orderNote: 'quick plz',
            orderStatus: 0
        },
        {
            orderId: 1,
            receiverId: 2,
            publisherId: 18,
            price: 10,
            takeAddress: 'Washinton',
            sendAddress: 'here',
            orderNote: 'quick plz',
            orderStatus: 2
        },
        {
            orderId: 1,
            receiverId: 2,
            publisherId: 18,
            price: 10,
            takeAddress: 'Washinton',
            sendAddress: 'here',
            orderNote: 'quick plz',
            orderStatus: 3
        }
    ]
    data.orderList = tdata
    console.log(data.total)
    console.log(data.orderList)
    console.log(data.currentPage)
    console.log(data.pageSize)
    // publishedOrders({
    //     publisherId: store.state.user.userId,
    //     currentPage: data.currentPage,
    //     size: data.pageSize,
    // }).then((res) => {
    //     data.orderList = res.orderList;
    //     data.total = res.total;
    //     data.currentPage = res.currentPage;
    //     data.pageSize = res.currentPage;
    // })
}

onMounted(() => {
    getList()
})
let {orderList, total, currentPage, pageSize} = toRefs(data)

const changePage = (val) => {
    console.log(val)
    data.currentPage = val;
    getList()
    // data.orderList = getList()
}
</script>
<style lang="scss" scoped></style>