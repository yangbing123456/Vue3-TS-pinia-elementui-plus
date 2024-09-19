<template>
  <div class="contanier">
    <div class="login">
      <div class="header">
        <img class="logo" src="../assets/logo.svg" alt="" />
        <span class="title">后台管理系统</span>
      </div>

      <el-form ref="login" :model="ruleForm" :rules="rules" label-width="auto" size="large">
        <el-form-item label="" prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="ruleForm.password" placeholder="密码" type="password">
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="pas">
        <el-checkbox v-model="remember" label="记住密码" size="large" />
        <el-link type="primary" @click="router.push('/forget')">忘记密码</el-link>
      </div>
      <el-button type="primary" class="login-btn" size="large" @click="submitForm(login)"
        >登录</el-button
      >
      <p class="tips">注意：用户名密码随便填写</p>
      <p class="register">
        没有账号？
        <el-link type="primary" @click="router.push('/register')">立即注册</el-link>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts" name="">
import { ElMessage, type FormInstance } from 'element-plus'
import { usePermissStore } from '@/store/permiss'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const permiss = usePermissStore()

const login = ref<FormInstance>()

interface rulesform {
  username: string
  password: string
}

// 这里判断是否记住密码
const lgStr = localStorage.getItem('login-param')
const defParam = lgStr ? JSON.parse(lgStr) : null
const remember = ref(lgStr ? true : false)

const ruleForm = reactive<rulesform>({
  username: defParam ? defParam.username : '',
  password: defParam ? defParam.password : ''
})

// 表单校验
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

// 登录
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid: boolean): any => {
    if (valid) {
      ElMessage.success('登录成功')
      localStorage.setItem('username', ruleForm.username)
      const keys = permiss.defaultList[ruleForm.username == 'admin' ? 'admin' : 'user']
      permiss.handleSet(keys)
      router.push('/')
      if (remember.value) {
        localStorage.setItem('login-param', JSON.stringify(ruleForm))
      } else {
        localStorage.removeItem('login-param')
      }
    } else {
      ElMessage.error('登录失败')
      return false
    }
  })
}
</script>
<style scoped lang="scss">
.contanier {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('@/assets/login-bg.jpg') center/cover no-repeat;
  .login {
    min-width: 450px;
    background-color: #fff;
    border-radius: 8px;
    padding: 48px;
    box-sizing: border-box;
    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 32px;
      .logo {
        width: 35px;
      }
      .title {
        display: block;
        font-size: 24px;
        font-weight: 700;
        margin-left: 16px;
      }
    }
    .pas {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .login-btn {
      width: 100%;
      border-radius: 8px;
    }
    .tips {
      font-size: 12px;
      color: #999;
    }
    .register {
      margin-top: 16px;
      font-size: 14px;
      color: #999;
    }
  }
}
</style>
