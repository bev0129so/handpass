<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <div id="security">
    <el-descriptions title="账户安全" column="1">
      <el-descriptions-item label="用户id" class="spacing">
        {{ store.state.user.userId }}
      </el-descriptions-item>
      <el-descriptions-item label="学号" class="spacing">
        {{ store.state.user.username }}
      </el-descriptions-item>
    </el-descriptions>

    <!-- :model el-form 的 model 属性是用来指定表单使用的数据-->
    <el-form :model="pwds" :rules="rules" ref="user">
        <el-form-item label="旧密码" prop="oldPwd">
            <el-input v-model="pwds.oldPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
            <el-input v-model="pwds.newPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onUpdate" :disabled="isDisabled">更新</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, toRefs, ref, watch, onMounted } from 'vue'
import { useStore } from 'vuex'

import { checkPwd } from '../../utils/formRules';
import { onBeforeRouteLeave } from 'vue-router';
import { ElMessageBox } from 'element-plus';

const store = useStore()
const state = reactive({
  pwds: {
    oldPwd: '',
    newPwd: ''
  },
  isDisabled: true,
  rules: {
    oldPwd: {validator: checkPwd, trigger: 'blur'},
    newPwd: {validator: checkPwd, trigger: 'blur'}
  }
})
const {pwds, isDisabled, rules} = toRefs(state)
const user = ref(null)

watch(
    () => pwds,
    (value) => isDisabled.value = false,
    {deep: true}
)

onBeforeRouteLeave((to, from, next) => {
    if(state.isDisabled == false) {
        ElMessageBox.confirm(
            "内容已修改，是否离开",
            "提示",
            {
                confirmButtonText: '确定',
                cancelButtonText: '留在当前页',
                type: 'warning'
            }
        ).then(() => {
            next()
        }).catch((err) => {
            console.log(err)
            next(from.path)
        })

    }else {
      next()
    }
})

const onUpdate = () => {
    console.log('update')
    user.value.validate((valid) => {
      if(valid) {
        user.value = pwds
        stated.isDisabled = true
      }
    })
}

</script>

<style scoped lang="scss"></style>
