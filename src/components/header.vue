<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="header-left">
      <img class="logo" src="../assets/logo.svg" alt="" />
      <div class="web-title">后台管理系统</div>
      <div class="collapse-btn" @click="collapseChage">
        <el-icon v-if="header.collapse">
          <Expand />
        </el-icon>
        <el-icon v-else>
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="head-right">
      <!-- 用户头像 -->
      <el-avatar class="user-avator" :size="30" :src="imgurl" />
      <!-- 用户名下拉菜单 -->
      <el-dropdown class="user-name" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useHeaderStore } from '@/store/header'
import imgurl from '@/assets/mylogo.png'
import { useRouter } from 'vue-router'

const username: string | null = localStorage.getItem('username')

const header = useHeaderStore()
// 侧边栏折叠
const collapseChage = () => {
  header.handleCollapse()
}

const router = useRouter()
const handleCommand = (command: string) => {
  if (command === 'user') {
    router.push('/user-center')
  } else if (command === 'loginout') {
    localStorage.removeItem('user_name')
    router.push('/login')
  }
}

onMounted(() => {
  if (document.body.clientWidth < 1500) {
    collapseChage()
  }
})
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  color: var(--header-text-color);
  background-color: var(--header-bg-color);
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
  padding-left: 20px;
  height: 100%;
}
.head-right {
  display: flex;
  align-items: center;
  padding-right: 50px;
}

.logo {
  width: 35px;
}

.web-title {
  margin: 0 40px 0 10px;
  font-size: 22px;
}

.collapse-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
  opacity: 0.8;
  font-size: 22px;
}

.collapse-btn:hover {
  opacity: 1;
}
.user-avator {
  margin: 0 10px 0 20px;
}
.el-dropdown-link {
  color: var(--header-text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
