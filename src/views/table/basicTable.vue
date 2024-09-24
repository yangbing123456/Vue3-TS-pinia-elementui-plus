<template>
  <div class="contanier">
    <!-- 搜索 -->
    <tableSearch :query="query" :options="optionSearch" :search="search"></tableSearch>
    <!-- 表格 -->
    <tableContent :columns="columns" :tableData="tableData" :total="page.total" :viewFunc="handleView"
				:delFunc="handleDelete" :editFunc="handleEdit" :refresh="BasicData" :currentPage="page.total"
				:changePage="changePage">
        <!-- 新增按钮 -->
      <template #addBtn>
        <el-button type="warning" :icon="CirclePlusFilled" @click="visible = true">新增</el-button>
      </template>
      <!-- 账户余额 -->
      <template #accountBalance="{ rows }"> ￥{{ rows.accountBalance }} </template>
      <!-- 头像 -->
      <template #avatar="{ rows }">
        <el-image
          class="table-td-thumb"
          :src="rows.avatar"
          :z-index="10"
          :preview-src-list="[rows.avatar]"
          preview-teleported
        >
        </el-image>
      </template>
      <!-- 账户状态 -->
      <template #accountStatus="{ rows }">
        <el-tag :type="rows.accountStatus ? 'success' : 'danger'">
          {{ rows.accountStatus ? '正常' : '异常' }}
        </el-tag>
      </template>
    </tableContent>

    <!-- 新增或编辑 -->
    <el-dialog :title="isEdit ? '编辑' : '新增'" v-model="visible" width="700px" destroy-on-close
			:close-on-click-modal="false" @close="closeDialog">
			<tableEdit :form-data="rowData" :options="options" :edit="isEdit" :update="updateData">
				<template #avatar="{ rows }">
					<img class="table-td-thumb" :src="rows.avatar"></img>
				</template>
			</tableEdit>
		</el-dialog>

    <!-- 查看详情 -->
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
			<tableDetail :data="viewData">
				<template #avatar="{ rows }">
					<el-image :src="rows.avatar"></el-image>
				</template>
			</tableDetail>
		</el-dialog>
  </div>
</template>
<script setup lang="ts" name="basicTable">
// 引入组件
import tableSearch from '@/components/tableSearch.vue'
import tableContent from '@/components/tableContent.vue'
import tableDetail from '@/components/tableDetail.vue'
import tableEdit from '@/components/tableEdit.vue'

// 引入elementui 样式组件
import { CirclePlusFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 引入ts规则
import type { basicUser } from '@/types/user'
import type { FormOption } from '@/types/form-option'
import type { view } from '@/types/view'

// 引入mock数据
import { getBasicData } from '@/api'

import { reactive, ref } from 'vue'

// 搜索条件
const query = ref({
  userName: ''
})
const optionSearch = reactive([{ prop: 'userName', label: '用户名：', type: 'input' }])
const search = () => {}

// 表格相关 列头
const columns = ref([
  { type: 'selection' },
  { type: 'index', width: 55, align: 'center', label: '序号' },
  { prop: 'userName', label: '用户名' },
  { prop: 'accountBalance', label: '账户余额' },
  { prop: 'avatar', label: '头像' },
  { prop: 'accountStatus', label: '账户状态' },
  { prop: 'operator', label: '操作', width: 250 }
])

// 表格数据
const tableData = ref<Array<basicUser>>([])
const BasicData = async () => {
  const res = await getBasicData()
  tableData.value = res.data.list
  page.total = res.data.total
}
BasicData()

// 弹窗相关
const changePage = (val: number) => {
	page.total = val;
	BasicData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
	labelWidth: '100px',
	span: 24,
	list: [
		{ type: 'input', label: '用户名', prop: 'userName', required: true },
		{ type: 'number', label: '账户余额', prop: 'accountBalance', required: true },
		{ type: 'switch', activeText: '正常', inactiveText: '异常', label: '账户状态', prop: 'accountStatus', required: true },
		{ type: 'upload', label: '头像', prop: 'avatar', required: true },
	]
})
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: basicUser) => {
	rowData.value = { ...row };
	isEdit.value = true;
	visible.value = true;
};
const updateData = () => {
	closeDialog();
	BasicData();
};

const closeDialog = () => {
	visible.value = false;
	isEdit.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref<view>({
	row: {},
	list: []
});
const handleView = (row: basicUser) => {
	viewData.value.row = { ...row }
	viewData.value.list = [
		{
			prop: 'id',
			label: '用户ID',
		},
		{
			prop: 'userName',
			label: '用户名',
		},
		{
			prop: 'accountBalance',
			label: '账户余额',
		},
		{
			prop: 'accountStatus',
			label: '账户状态',
		},
    {
			prop: 'address',
			label: '地址',
		},
    {
			prop: 'date',
			label: '日期',
		},
		{
			prop: 'avatar',
			label: '头像',
		},
	]
	visible1.value = true;
};

// 删除相关
const handleDelete = (row: basicUser) => {
	ElMessage.success('删除成功');
}

// 分页相关
const page = reactive({
  total: 0,
  pageSize: 10,
  pageNumber: 1
})
</script>

<style scoped lang="scss">
.contanier {
  width: auto;
  height: 100%;
  padding: 32px;
  margin: 0;
  box-sizing: border-box;
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
}
</style>
