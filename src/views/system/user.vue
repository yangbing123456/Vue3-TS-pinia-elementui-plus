<template>
  <div class="contanier">
    <tableSearch :query="query" :options="searchOptions" :search="searchHandler"></tableSearch>

    <tableContent
      :columns="columns"
      :tableData="tableData"
      :total="page.total"
      :viewFunc="handleView"
      :delFunc="handleDelete"
      :change-page="changePage"
      :editFunc="handleEdit"
      :currentPage="page.pageNum"
    >
      <template #addBtn>
        <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
      </template>
    </tableContent>

    <!-- 新增&编辑 -->
    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <tableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData" />
    </el-dialog>

    <!-- 查看详情 -->
    <el-dialog v-model="visible1" title="查看详情">
      <tableDetail :data="viewData"></tableDetail>
    </el-dialog>
  </div>
</template>
<script setup lang="ts" name="user">
import tableSearch from '@/components/tableSearch.vue'
import tableContent from '@/components/tableContent.vue'
import tableDetail from '@/components/tableDetail.vue'
import tableEdit from '@/components/tableEdit.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { type User } from '@/types/user'
import { type view } from '@/types/view'
import { type FormOption } from '@/types/form-option'
import { getUserData } from '@/api'

import { onMounted, reactive, ref } from 'vue'

// 搜索条件
const query = reactive({
  name: ''
})
const searchOptions = reactive([{ type: 'input', label: '用户名：', prop: 'name' }])
const searchHandler = () => {
  changePage(1)
}

// 表格相关
let columns = ref([
  { type: 'index', label: '序号', width: 55, align: 'center' },
  { prop: 'name', label: '用户名' },
  { prop: 'phone', label: '手机号' },
  { prop: 'role', label: '角色' },
  { prop: 'operator', label: '操作', width: 250 }
])
const page = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 获取表格数据 mock接口请求
const tableData = ref<Array<User>>([])
const getList = async () => {
  const res = await getUserData()
  tableData.value = res.data.list
  page.total = res.data.pageTotal
}
// getList()
onMounted(() => {
  getList()
})
const changePage = (val: number) => {
  page.pageNum = val
  getList()
}

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: '100px',
  span: 12,
  list: [
    { type: 'input', label: '用户名', prop: 'name', required: true },
    { type: 'input', label: '手机号', prop: 'phone', required: true },
    { type: 'input', label: '密码', prop: 'password', required: true },
    { type: 'input', label: '邮箱', prop: 'email', required: true },
    { type: 'input', label: '角色', prop: 'role', required: true }
  ]
})
// 弹窗相关
const visible = ref(false)
const isEdit = ref(false)
const rowData = ref({})
const handleEdit = (row: User) => {
  rowData.value = { ...row }
  isEdit.value = true
  visible.value = true
}

// 查看详情弹窗相关
const visible1 = ref(false)
const viewData = ref<view>({
  row: {},
  list: []
})
const handleView = (row: User) => {
  viewData.value.row = { ...row }

  viewData.value.list = [
    {
      prop: 'id',
      label: '用户ID'
    },
    {
      prop: 'name',
      label: '用户名'
    },
    {
      prop: 'password',
      label: '密码'
    },
    {
      prop: 'email',
      label: '邮箱'
    },
    {
      prop: 'phone',
      label: '电话'
    },
    {
      prop: 'role',
      label: '角色'
    },
    {
      prop: 'date',
      label: '注册日期'
    }
  ]
  visible1.value = true
}

// 删除相关
const handleDelete = (row: User) => {
  ElMessage.success('删除成功')
}

const updateData = () => {
  closeDialog()
  getList()
}

const closeDialog = () => {
  visible.value = false
  isEdit.value = false
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
