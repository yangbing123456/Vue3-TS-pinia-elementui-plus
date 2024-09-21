<template>
  <el-descriptions :title="title" :column="column" border>
    <el-descriptions-item v-for="item in list" :span="item.span">
      <template #label> {{ item.label }} </template>
      <slot :name="item.prop" :rows="row">
        {{ item.value || row[item.prop] }}
      </slot>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
//  解构出来 要用 toRefs  包裹 才不会失去响应性
// 还有一种方式就是不解构 直接用data
const { row, title, column = 2, list } = toRefs(props.data)
</script>
