<template>
  <div class="contanier">
    <!-- 查询组件 -->
    <!-- 需要三个参数  query 查询条件，options 条件组 search 查询方法-->
    <tableSearch :query="query" :options="options" :search="search"></tableSearch>

    <!-- 表格 -->
    <tableContent
      :columns="columns"
      :tableData="tableData"
      :total="page.total"
      :viewFunc="handleView"
      :delFunc="handleDelete"
      :change-page="changePage"
      :editFunc="handleEdit"
      :current-page="page.pageNum"
    >
      <template #addBtn>
        <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
      </template>
      <template #roleStatus="{ rows }">
        <el-tag type="success" v-if="rows.roleStatus">启用</el-tag>
        <el-tag type="danger" v-else>禁用</el-tag>
      </template>
      <template #rolePermissions="{ rows }">
        <el-button type="primary" size="small" plain @click="handlePermission(rows)"
          >管理</el-button
        >
      </template>
    </tableContent>

    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <tableEdit :form-data="rowData" :options="option" :edit="isEdit" :update="updateData" />
    </el-dialog>

    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <tableDetail :data="viewData">
        <template #roleStatus="{ rows }">
          <el-tag type="success" v-if="rows.roleStatus">启用</el-tag>
          <el-tag type="danger" v-else>禁用</el-tag>
        </template>
      </tableDetail>
    </el-dialog>

    <el-dialog title="权限管理" v-model="visible2" width="500px" destroy-on-close>
      <rolePermission :permiss-options="permissOptions" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="role">
import tableSearch from '@/components/tableSearch.vue'
import tableContent from '@/components/tableContent.vue'
import rolePermission from './rolePermission.vue'
import tableEdit from '@/components/tableEdit.vue'
import tableDetail from '@/components/tableDetail.vue'
import { ElMessage } from 'element-plus'

import { CirclePlusFilled } from '@element-plus/icons-vue'
import { getRoleData } from '@/api'

import type { FormOptionList, FormOption } from '@/types/form-option'
import type { Role } from '@/types/role'
import type { User } from '@/types/user'
import type { view } from '@/types/view'

import { reactive, ref } from 'vue'

// 搜索条件
const query = reactive({
  roleName: ''
})
// 条件组
const options = reactive<Array<FormOptionList>>([
  { type: 'input', prop: 'roleName', label: '角色名称：' }
])
// 查询方法
const search = () => {
  changePage(1)
}

const changePage = (val: number) => {
  ;(page.pageNum = val), getList()
}

// 表格相关 表格表头列
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

// 查看详情弹窗相关
const visible1 = ref(false)
const viewData = ref<view>({
  row: {},
  list: [],
  column: 1
})
const handleView = (row: Role) => {
  viewData.value.row = { ...row }
  viewData.value.list = [
    {
      prop: 'id',
      label: '角色ID'
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
      label: '角色状态'
    }
  ]
  visible1.value = true
}

// 新增/编辑弹窗相关
const option = ref<FormOption>({
  labelWidth: '100px',
  span: 24,
  list: [
    { type: 'input', label: '角色名称', prop: 'roleName', required: true },
    { type: 'input', label: '角色标识', prop: 'roleMark', required: true },
    {
      type: 'switch',
      label: '状态',
      prop: 'roleStatus',
      required: false,
      activeText: '启用',
      inactiveText: '禁用'
    }
  ]
})

// 删除相关
const handleDelete = (row: User) => {
  ElMessage.success('删除成功')
}

// 弹窗相关
const visible = ref(false)
const isEdit = ref(false)
const rowData = ref({})
const handleEdit = (row: User) => {
  rowData.value = { ...row }
  isEdit.value = true
  visible.value = true
}
const updateData = () => {
  closeDialog()
  getList()
}
const closeDialog = () => {
  visible.value = false
  isEdit.value = false
  rowData.value = {}
}

const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const tableData = ref([])
const getList = async () => {
  const res = await getRoleData()
  tableData.value = res.data.list
  page.total = res.data.pageTotal
}
getList()

// 权限管理弹窗相关
const visible2 = ref(false)
const permissOptions = ref({})
const handlePermission = (row: Role) => {
  visible2.value = true
  permissOptions.value = {
    id: row.id,
    rolePermissions: row.rolePermissions
  }
}
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
