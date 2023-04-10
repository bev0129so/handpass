<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <div id="register">
    <h2>Sign Up</h2>
    <el-form status-icon :model="regForm" ref="regInfo" :rules="rules">
      <el-form-item prop="username">
        <el-input placeholder="输入学号" v-model="regForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input placeholder="姓名" v-model="regForm.name"></el-input>
      </el-form-item>
      <el-form-item prop="sex">
        <el-radio-group disabled v-model="regForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="regForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input type="password" placeholder="请确认密码" v-model="regForm.checkPassword"></el-input>
      </el-form-item>
      <el-form-item class="input-captcha" prop="captcha">
        <el-input v-model="regForm.captcha"></el-input>
        <captcha></captcha>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, watch, toRefs, ref } from 'vue'
import Captcha from '../../components/content/Captcha'
import { checkUsername, checkPwd } from '../../utils/formRules.js'
import {register} from '../../network/user.js'
import { useRouter } from 'vue-router';


// 判断密码输入是否一致
const confirmPwd = (rule, value, callback) => {
  console.log(state.regForm.password)
  console.log(state.regForm.checkPassword)
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value != state.regForm.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}

const router = useRouter()

const state = reactive({
  regForm: {
    username: '',
    name: '',
    sex: '',
    password: '',
    checkPassword: '',
    captcha: ''
  },
  rules: {
    username: { validator: checkUsername, trigger: 'blur' },
    name: { required: true, message: '姓名不能为空', trigger: 'blur' },
    sex: { required: true, message: '请选择你的性别', trigger: 'change' },
    password: { validator: checkPwd, trigger: 'blur' },
    checkPassword: { validator: confirmPwd, trigger: 'blur' },
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
  }
})

const { regForm, rules } = toRefs(state)
const regInfo = ref(null)

const onSubmit = () => {
  regInfo.value.validate((valid) => {
    if (valid) {
      // 注册信息封装
      regInfo.value = {
        username: state.regForm.username,
        password: state.regForm.password,
        name: state.regForm.name,
        sex: state.regForm.sex == "男" ? 0 : 1,
        captcha: state.regForm.captcha
      };
      console.log(regInfo.value)
      register(regInfo.value).then((res) => {
        if(res && res.code == 200) {
            router.push({name: 'Home'})
        }
      })
    }
  })
}

watch(
  () =>  state.regForm.username ,
  (username) => {
    username = '' + username
    if (username.toString().charAt(0) == '1') {
      state.regForm.sex = '男'
    } else if (username.toString().charAt(0) == '2') {
      state.regForm.sex = '女'
    }
  },
  { deep: true }
)

</script>

<style scoped lang="scss"></style>
