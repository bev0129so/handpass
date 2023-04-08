import { createStore } from "vuex";
import mutations from './mutations'
const state = {
    user: {
        isLogin: window.localStorage.getItem('token') ? true: false,
        userId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userId : 0,
		username: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).username : "",
		roleId: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).roleId : 3,
		userIcon: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')).userIcon : "",
    }
}

export default createStore({
    //全局对象：用于保存所有组件的公共数据
    state,
    mutations
})