<template>
  <div class="contanier">
    <tableSearch :query="query" :options="searchOptions" :search="searchHandler"></tableSearch>

    <tableContent
      :columns="columns"
      :tableData="tableData"
      :total="page.total"
      :viewFunc="handleView"
      :delFunc="handleDelete"
      :page-change="changePage"
      :editFunc="handleEdit"
    >
      <template #addBtn>
        <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
      </template>
    </tableContent>
  </div>
</template>
<script setup lang="ts" name="user">
import tableSearch from '@/components/tableSearch.vue'
import tableContent from '@/components/tableContent.vue'
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import { type User } from '@/types/user'
import { getUserData } from '@/api'

import { onMounted, reactive, ref } from 'vue'

const query = reactive({
  name: ''
})
const searchOptions = reactive([{ type: 'input', label: '用户名', prop: 'name' }])
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
  index: 1,
  size: 10,
  total: 0
})

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
  ;(page.index = val), getList()
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

// 查看详情弹窗相关
const visible1 = ref(false)
const viewData = ref({
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
</script>
<style scoped lang="scss">
.contanier {
  width: auto;
  height: 100%;
  padding: 32px;
  margin: 0;
  box-sizing: border-box;
  // .bottom {
  //   background-color: #fff;
  //   border-radius: 8px;
  // }
}
</style>
