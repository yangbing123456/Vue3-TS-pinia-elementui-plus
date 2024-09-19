<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="header.collapse"
    :background-color="header.bgColor"
    :text-color="header.textColor"
    @open="handleOpen"
    @close="handleClose"
    :active-text-color="header.activeColor"
    :default-active="onRoutes"
    router
  >
    <template v-for="item in menuData">
      <template v-if="item.children">
        <el-sub-menu :index="item.index" :key="item.index">
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>

          <template v-for="subItem in item.children">
            <el-sub-menu
              v-if="subItem.children"
              :index="subItem.index"
              :key="subItem.index"
              v-permiss="item.id"
            >
              <template #title>{{ subItem.title }}</template>
              <el-menu-item
                v-for="(threeItem, i) in subItem.children"
                :key="i"
                :index="threeItem.index"
              >
                {{ threeItem.title }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="subItem.index" v-permiss="item.id">
              {{ subItem.title }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>

      <template v-else>
        <el-menu-item :index="item.index" :key="item.index" v-permiss="item.id">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script setup lang="ts" name="">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useHeaderStore } from '@/store/header'
import { menuData } from './menus'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const onRoutes = computed(() => {
  return route.path
})
const header = useHeaderStore()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-menu-vertical-demo {
  height: 100%;
}
</style>
