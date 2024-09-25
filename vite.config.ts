import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // '@': '/src'
      // '@': path.resolve(__dirname, 'src')
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
  // server: {
  //   port: 3000, // 代理的端口号
  //   proxy: [
  //     {
  //       // 配置一个代理
  //       target: 'http://127.0.0.1:4523', // 要代理的服务器域名或地址
  //       changeOrigin: true, // 允许跨域
  //       ws: true, // 打开websocket
  //       pathRewrite: {
  //         // 如果路径需要改写
  //         '^/api': '' // 正则表达式匹配的地方替换为''
  //       }
  //     }
  //   ]
  // },
  //   server: {
  //     // port: "8080",
  //     // disableHostCheck: true,
  //     proxy: {
  //         "/api": {
  //             target: "http://127.0.0.1:4523",
  //             ws: true,
  //             changeOrigin: true,
  //             pathRewrite: {
  //                 "^/api": ""
  //             }
  //         }
  //     }
  // }
})
