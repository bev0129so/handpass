import { createStore } from "vuex";
import mutations from './mutations'
const state = {
    user: {
        // isLogin: window.localStorage.getItem('token') ? true: false,
        isLogin: true,
        userId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userId : 0,
		username: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).username : "",
		roleId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).roleId : 3,
		userIcon: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userIcon : "",
    },
    orderCategory: [{
        name: "帮拿外卖",
        id: 1
    },
    {
        name: "帮取快递",
        id: 2
    },
    {
        name: "饭堂打包",
        id: 3
    },
    {
        name: "帮忙打印",
        id: 4
    },
    {
        name: "帮带物品",
        id: 5
    },
    {
        name: "其他",
        id: 6
    }
],
}

export default createStore({
    //全局对象：用于保存所有组件的公共数据
    state,
    mutations
})