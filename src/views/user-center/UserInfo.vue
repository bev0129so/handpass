<!--
* @Component: 
* @Maintainer: 
* @Description: 
-->
<template>
  <div id="user-info">
    <el-upload
      class="avatar-upload"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :data="avatar"
      :show-file-list="false"
      :multiple="false"
      :on-success="handleSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="user.userIcon" :src="user.userIcon" alt="" class="avatar" />
      <!-- <i class="el-icon-plus avatar-uploader-icon"></i> -->
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <el-form :model="user" ref="userData">
      <el-form-item label="姓名" prop="name">
        <el-input :placeholder="user.name" v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="userContact">
        <el-input
          :placeholder="user.userContact"
          v-model="user.userContact"
        ></el-input>
      </el-form-item>
      <el-form-item label="所在校区">
        <el-select v-model="user.userPosition">
          <el-option v-for="p in positions"
            :key="p.value"
            :label="p.label"
            :value="p.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onUpdate" :disabled="isDisabled"
          >确认修改</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { getUserInfo, updateUserInfo } from '../../network/user'
import { ref, toRefs, reactive, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { policy } from '../../network/oss'
import { onBeforeRouteLeave } from 'vue-router'

const store = useStore()
const data = reactive({
  user: {
    userIcon: '',
    name: '',
    userContact: '',
    userPosition: ''
  },
  isDisabled: true,
  positions: store.state.positions,
  avatar: {
    policy: '',
    signature: '',
    key: '',
    ossaccessKeyId: '',
    dir: '',
    host: ''
  }
})

let userData = ref(null)

let { user, isDisabled, positions, avatar } = toRefs(data)

const beforeAvatarUpload = (file) => {
  return new Promise((resolve, reject) => {
    policy()
      .then((res) => {
        console.log('accessKeyId:' + response.object.accessKeyId)
        data.avatar.policy = response.object.policy
        data.avatar.signature = response.object.signature
        data.avatar.ossaccessKeyId = response.object.accessKeyId
        data.avatar.key = response.object.dir + `${file.name}`
        data.avatar.dir = response.object.dir
        data.avatar.host = response.object.host
        resolve(true)
        resolve(true)
      })
      .catch((err) => {
        reject(false)
      })
  })
}

const handleSuccess = (res, file) => {
  data.user.userIcon =
    'https://the5gofor.oss-cn-guangzhou.aliyuncs.com' +
    '/' +
    data.avatar.dir +
    file.name
}

const onUpdate = () => {
    //update user info
    updateUserInfo(data.user)
    //storage
    window.localStorage.setItem('user', JSON.stringify(data.user))
    store.commit('setUser', {
        user: data.user
    })
    data.isDisabled=true
    console.log(data.user)
    window.location.reload()
}

onBeforeRouteLeave((to, from, next) => {
  if (data.isDisabled == false) {
    ElMessageBox.confirm(
      '已修改的信息尚未保存，是否离开当前页面？',
      '提示',
      {
        confirmButtonText: '离开页面',
        cancelButtontext: '留在当前页面',
        type: 'warning'
      })
        .then(() => {
          next()
        })
        .catch(() => {
          next(from.path)
        })
  } else {
    next()
  }
});

(async () => {
  await getUserInfo().then((res) => {
    if(res && res.code == 200) {
        data.user = res
    }
  })
})()


watch(
    () => {return data.user},
    (value) => {
      data.isDisabled = false
    },
    { deep: true }
  )
</script>

<style scoped lang="scss">
#user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-form {
  width: 300px;
}

.avatar-upload {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px dashed var(--font-title-color);
  cursor: pointer;
  margin-bottom: 30px;
  overflow: hidden;
}

img.avatar {
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.el-button {
  width: 100%;
  margin-top: 40px;
}
</style>
