<template>
  <div class="contanier">
    <tableSearch :query="query" :options="options" :search="search"></tableSearch>
    <tableContent :columns="columns" :tableData="tableData">
      <template #addBtn>
        <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
      </template>
      <template #roleStatus="{ rows }">
        <el-tag type="success" v-if="rows.roleStatus">启用</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
      <!-- <template #rolePermissions="{ rows }">
        <el-button type="primary" size="small" plain @click="handlePermission(rows)"
          >管理</el-button
        >
      </template> -->
    </tableContent>
  </div>
</template>
<script setup lang="ts" name="role">
import tableSearch from '@/components/tableSearch.vue'
import tableContent from '@/components/tableContent.vue'

import { CirclePlusFilled } from '@element-plus/icons-vue'
import { getRoleData } from '@/api'

import type { FormOptionList } from '@/types/form-option'

import { reactive, ref } from 'vue'

// 搜索条件
const query = reactive({
  name: ''
})
const options = reactive<Array<FormOptionList>>([
  { type: 'input', prop: 'name', label: '角色名称：' }
])
const search = () => {}

const visible = ref(false)

// 表格相关
const columns = reactive([
  {
    type: 'index',
    label: '序号',
    width: 55,
    align: 'center'
  },
  {
    prop: 'roleName',
    label: '角色名称'
  },
  {
    prop: 'roleMark',
    label: '角色标识'
  },
  {
    prop: 'roleStatus',
    label: '状态'
  },
  {
    prop: 'rolePermissions',
    label: '权限管理'
  },
  { prop: 'operator', label: '操作', width: 250 }
])

const page = reactive({
  index: 1,
  size: 10,
  total: 0
})

const tableData = ref([])
const getList = async () => {
  const res = await getRoleData()
  tableData.value = res.data.list
  page.total = res.data.pageTotal
}
getList()
</script>
<style scoped lang="scss">
.contanier {
  width: auto;
  height: 100%;
  padding: 32px;
  margin: 0;
  box-sizing: border-box;
}
</style>
