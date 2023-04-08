<!--
* @Component:
* @Maintainer:
* @Description:
-->
<template>
    <div>img will show below</div>
  <div class="captcha" @click="getOrRefresh">
    <img :src="captchaSrc" alt="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const captchaSrc = ref('')
const getOrRefresh = () => {
  captchaSrc.value = '/captcha?time=' + new Date()
  console.log(captchaSrc.value)
}
onMounted(() => {
  getOrRefresh()
})
</script>
<style scoped lang="scss">
.captcha {
  cursor: pointer;
  width: 100px;
  height: 40px;
  z-index: 100;
}

.captcha img {
  object-fit: cover;
}
</style>
