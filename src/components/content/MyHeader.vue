<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <header>
    <div class="logo" @click="$router.push({ name: 'Home' })">
      <img src="../../assets/images/logo.png" alt="" />
    </div>
    <!-- 搜索 -->
    <div class="search">
      <input
        type="search"
        name=""
        id=""
        placeholder="地址搜索"
        class="search"
        v-model="keywords"
        @keyup.enter="$router.push({ name: 'Home', params: { keywords } })"
      />
    </div>

    <!-- 用户已登录时展示的部分 key作用: 键发生变化，将重新创建元素 -->
    <!-- TODO -->
    <div v-if="true" key="loginHeader" class="login-header">
      <router-link
        to="/show-echart"
        tag="span"
        class="manager"
        v-if="user.roleId == 1 || user.roleId == 2"
        >管理员入口
      </router-link>
      <div class="user-center">
        <el-button type="primary" @click="$router.push({ name: 'PublishOrder' })">我要发布</el-button>
        <!-- 个人中心导航 -->
        <el-menu
          menu-trigger="hover"
          mode="horizontal"
          active-text-color="var(--theme-medium-green)"
          :router="true"
          :ellipsis="false"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-avatar size="default" :src="user.userIcon"></el-avatar>
            </template>
            <el-menu-item index="/userinfo">个人中心</el-menu-item>
            <el-menu-item index="/my-published">我的订单</el-menu-item>
            <el-menu-item index="/history">历史浏览</el-menu-item>
            <el-menu-item index="/" @click="toLogout">退出账号</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </div>
    <!-- 用户未登录时展示的部分 -->
    <el-button
      v-else
      key=""
      class="login"
      @click="$router.push({ name: 'LoginPage' })"
    >登录/注册</el-button>
  </header>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { logout } from '../../network/user.js'

const store = useStore()
const router = useRouter()
const user = ref({})
const keywords = ref('')

const toLogout = () => {
  ElMessageBox.confirm('确定退出', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    logout().then((res) => {
      if (res && res.code == 200) {
        // 清除token
        window.localStorage.setItem('token', '')
        window.localStorage.setItem('user', '')
        store.commit('setIsLogin', false)
        store.commit('setUser', { user: '' })
        router.go({ name: 'Home' })
      }
    })
  })
}
onMounted(() => {
  user.value = store.state.user
  console.log(user.value)
})
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: sticky;
  left: 0;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: var(--font-color);
  z-index: 100;
}

.logo {
  height: 42px;
  line-height: 42px;
  cursor: pointer;
}

.login {
  width: 180px;
  height: 30px;
}

.search {
  position: relative;
}

.search input {
  width: 25px;
  height: 25px;
  padding: 10px;
  border: solid 3px var(--theme-medium-green);
  background: transparent;
  border-radius: 25px;
  cursor: pointer;
  transition: 0.5s;
}

.search::after {
  content: '';
  position: absolute;
  bottom: 19px;
  right: -4px;
  width: 3px;
  height: 15px;
  background: var(--theme-medium-green);
  transform: rotate(135deg);
}

.search input:focus {
  width: 250px;
  padding: 18px;
  cursor: default;
}

.login-header,
.user-center {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-header {
  width: 340px;
  margin-left: 100px;
}

.user-center {
  width: 250px;
}

.manager {
  font-size: 0.9em;
}

.manager:hover {
  color: var(--theme-medium-green);
  text-decoration: underline;
}
</style>
