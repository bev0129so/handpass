<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <div id="login">
    <h2>LOG IN</h2>
    <el-form status-icon :model="loginForm" :rules="rules" ref="loginInfo">
      <el-form-item prop="username">
        <el-input placeholder="学号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码"
          v-model="loginForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="code">
        <el-input
          v-model="loginForm.code"
          placeholder="点击更换图片"
        ></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
    <a href="#">忘记密码？</a>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { checkUsername, checkPwd } from '../../utils/formRules.js'
import { ref, reactive, toRefs } from 'vue'
import { login, getUserInfo } from '../../network/user.js'

const router = useRouter()
const store = useStore()
const state = reactive({
  captchaUrl: '/captcha?time=' + new Date(),
  loginForm: {
    username: '',
    password: '',
    code: ''
  },
  rules: {
    username: [{ validator: checkUsername, trigger: 'blur' }],
    password: [{ validator: checkPwd, trigger: 'blur' }],
    code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
})

const loginInfo = ref(null)
let { loginForm, rules } = toRefs(state)

const onSubmit = () => {
  loginInfo.value.validate((valid) => {
    if (valid) {
      (async () => {
        loginInfo.value = loginForm.value
        await login(loginInfo.value).then((res) => {
          if (res && res.code == 200) {
            // 储存用户token
            window.localStorage.setItem('token', res.object.token)
            // vuex储存用户登陆状态
            store.commit('setIsLogin', true)
          }
        })
        await getUserInfo().then((res) => {
            if(res && res.code == 200) {
          // 储存在localStorage，防止刷新后vuex里的信息丢失
          window.localStorage.setItem('user', JSON.stringify(res))
          store.commit('setUser', {
            user: window.localStorage.getItem('user')
          })
          router.go(-1)
        }
        })
      })()
    } else {
      return false
    }
  })
}
</script>

<style scoped lang="scss"></style>
