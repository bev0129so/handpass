<template>
    <div id="user-center">
        <my-header></my-header>
        <main>
            <el-container class="nav">
                <el-aside>
                    <el-menu :default-active="currentPath" :router="true" :default-openeds="defaultOpen">
                        <el-sub-menu index="1">
                            <template #title> 个人中心 </template>
                            <el-menu-item index="/userinfo">修改信息</el-menu-item>
                            <el-menu-item index="/security">账号安全</el-menu-item>
                            <el-menu-item index="/complain">投诉反馈</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="2">
                            <template #title> 我的订单 </template>
                            <el-menu-item index="/my-published">我发布的</el-menu-item>
                            <el-menu-item index="/my-received">我接受的</el-menu-item>
                            <el-menu-item index="/history">历史浏览</el-menu-item>
                        </el-sub-menu>
                    </el-menu>
                </el-aside>
                <el-main class="content">
                    <!-- <keep-alive>
                        <router-view></router-view>
                    </keep-alive> -->
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </el-main>
            </el-container>
        </main>
        <my-footer></my-footer>
    </div>
</template>

<script setup>
import MyHeader from "../../components/content/MyHeader.vue";
import MyFooter from "../../components/content/MyFooter.vue";
import { reactive, toRefs } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const state = reactive({
  defaultOpen: ["1", "2"],
  // 当前打开页
  currentPath: route.path,
});
const {defaultOpen, currentPath} = toRefs(state)
</script>

<style lang="scss" scoped>
main {
  height: 680px;
  background-color: #fff;
  padding: 30px 60px;
}</style>