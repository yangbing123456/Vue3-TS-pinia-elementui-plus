<template>
  <div class="wrapper">
    <headerBar></headerBar>
    <siderBar></siderBar>
    <div class="content-box" :class="{ 'content-collapse': header.collapse }">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts" name="home">
import headerBar from '@/components/header.vue'
import siderBar from '@/components/siderBar.vue'
import { useHeaderStore } from '@/store/header'
const header = useHeaderStore()
</script>
<style scoped lang="scss">
.wrapper {
  height: 100vh;
  overflow: hidden;
}
.content-box {
  position: absolute;
  left: 200px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #eef0fc;
  overflow: hidden;
  overflow-y: auto;
}
.content-collapse {
  left: 65px;
}
</style>
