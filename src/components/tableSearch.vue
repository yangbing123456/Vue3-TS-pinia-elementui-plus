<template>
  <div class="top">
    <el-form ref="searchForm" :model="query" :inline="true">
      <el-form-item :label="item.label" :prop="item.prop" v-for="item in options">
        <el-input
          v-if="item.type === 'input'"
          v-model="query[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          clearable
        ></el-input>
        <el-select
          v-if="item.type === 'select'"
          v-model="query[item.prop]"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          clearable
        >
          <el-option v-for="res in item.opt" :label="res.label" :value="res.value"></el-option>
        </el-select>
        <el-date-picker
          v-else-if="item.type === 'date'"
          type="date"
          v-model="query[item.prop]"
          :value-format="item.format"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="search">搜索</el-button>
        <el-button :icon="Refresh" @click="resetForm(searchForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts" name="">
import { Options, type FormInstance } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

import { type PropType, ref } from 'vue'
import { type FormOptionList } from '@/types/form-option'
// defineProps(['query', 'options', 'search'])
const props = defineProps({
  query: {
    type: Object,
    required: true
  },
  options: {
    type: Array as PropType<Array<FormOptionList>>,
    required: true
  },
  search: {
    type: Function,
    default: () => {}
  }
})

const searchForm = ref<FormInstance>()

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
  props.search()
}
</script>
<style scoped lang="scss">
::v-deep(.el-form-item) {
  margin-bottom: 0;
}
.top {
  box-sizing: border-box;
  padding: 32px;
  margin-bottom: 16px;
  background-color: #fff;
  border-radius: 8px;
}
</style>
