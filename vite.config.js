import { fileURLToPath, URL } from 'node:url'
import { defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({mode}) =>  {
  //此处process报错，不影响使用
  //获取环境配置文件的信息
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: 'src/mock', // Mock 文件存放的目录
        localEnabled: true, // 开发环境开启 Mock
        prodEnabled: false, // 生产环境关闭 Mock
        watchFiles: true, // 监听 Mock 文件变化
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    //服务相关配置，包括端口，请求转发代理等
    server: {
      host: '127.0.0.1',
      port: env.VITE_APP_PORT,  //读取环境配置文件中的端口
      proxy: {
        //当接口路径是/api开头的时候，将请求转发到如下地址
        '/api': {
          target: "http://127.0.0.1:38080",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, '')  //将接口路径中的/api替换为空字符串
        }
      }
    }
  }
})
