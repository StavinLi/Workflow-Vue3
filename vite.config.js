import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode, __dirname)
  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, "src"),
        '~@': path.resolve(__dirname, "src"),
      }
    },
    css: {
      preprocessorOptions: {
          less: {
              modifyVars: {},
              javascriptEnabled: true
          },
          scss: {
              additionalData: `@import "src/styles/global.scss";`
          }
      }
    },
    base: env.VITE_MODE === "production" ? '/Workflow-Vue3/dist/' : '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    build: {
  
      /** If you set esmExternals to true, this plugins assumes that 
        all external dependencies are ES modules */
   
      commonjsOptions: {
         esmExternals: true 
      },
   }
  }
})
