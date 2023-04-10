<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <div id="register">
    <h2>Sign Up</h2>
    <el-form status-icon>
      <el-form-item prop="username">
        <el-input placeholder="输入学号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group disabled>
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" placeholder="请确认密码"></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="captcha">
        <el-input></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'
import Captcha from '../../components/content/Captcha'
import { checkUsername, checkPwd } from '../../utils/formRules.js'

const state = reactive({
  regForm: {
    username: '',
    name: '',
    sex: '',
    password: '',
    confirmPwd: '',
    captcha: ''
  },
  rules: {
    username: { validator: checkUsername, trigger: 'blur' },
    name: { required: true, message: '姓名不能为空', trigger: 'blur' },
    sex: { required: true, message: '请选择你的性别', trigger: 'change' },
    password: { validator: checkPwd, trigger: 'blur' },
    checkPass: { validator: confirmPwd, trigger: 'blur' },
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
})

const onSubmit = () => {}

watch(
  () => {state.regForm.username},
  (username) => {
    if(username.toString().charAt(0) == '1') {
      state.regForm.sex = '男'
    }else if(username.toString().charAt(0) == '2') {
      state.regForm.sex = '女'
    }
  },
  {deep: true}
)

// 判断密码输入是否一致
const confirmPwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value != state.regForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
</script>

<style scoped lang="scss"></style>
