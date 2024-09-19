<template>
  <div class="content">
    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg1">
            <User />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color1" :end="6666" />
            <div>用户访问量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg2">
            <ChatDotRound />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color2" :end="168" />
            <div>系统消息</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg3">
            <Goods />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color3" :end="8888" />
            <div>商品数量</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" body-class="card-body">
          <el-icon class="card-icon bg4">
            <ShoppingCartFull />
          </el-icon>
          <div class="card-content">
            <countup class="card-num color4" :end="568" />
            <div>今日订单量</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mgb20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">品类分布</p>
            <p class="card-header-desc">最近一个月销售商品的品类情况</p>
          </div>
          <v-chart class="chart" :option="dashOpt2" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">订单动态</p>
            <p class="card-header-desc">最近一周订单状态，包括订单成交量和订单退货量</p>
          </div>
          <v-chart class="chart" :option="dashOpt1" />
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div class="card-header">
            <p class="card-header-title">柱状图</p>
            <p class="card-header-desc">test</p>
          </div>
          <v-chart class="chart" :option="barOptions" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
import countup from '@/components/countup.vue'
import { use, registerMap } from 'echarts/core'
import { BarChart, LineChart, PieChart, MapChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { dashOpt1, dashOpt2, mapOptions, barOptions } from './chart/options'
// import chinaMap from '@/utils/china'
use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  LineChart,
  PieChart,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  VisualMapComponent,
  MapChart
])
// registerMap('china', chinaMap)
</script>

<style>
.card-body {
  display: flex;
  align-items: center;
  height: 100px;
  padding: 0;
}
</style>
<style scoped>
.content {
  width: auto;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  overflow-x: auto;
  box-sizing: border-box;
}
.card-content {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
  padding: 0 20px;
}

.card-num {
  font-size: 30px;
}

.card-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.bg1 {
  background: #2d8cf0;
}

.bg2 {
  background: #64d572;
}

.bg3 {
  background: #f25e43;
}

.bg4 {
  background: #e9a745;
}

.color1 {
  color: #2d8cf0;
}

.color2 {
  color: #64d572;
}

.color3 {
  color: #f25e43;
}

.color4 {
  color: #e9a745;
}

.chart {
  width: 100%;
  height: 400px;
}

.card-header {
  padding-left: 10px;
  margin-bottom: 20px;
}

.card-header-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.card-header-desc {
  font-size: 14px;
  color: #999;
}
</style>
