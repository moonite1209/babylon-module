import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    root: process.cwd(),
    plugins: [], // 配置需要使用的插件列表
    base: '/',   // 在生产中服务时的基本公共路径
    publicDir: 'public',  // 静态资源服务的文件夹, 默认"public"
    resolve: {
        alias: {
            "@": path.resolve(__dirname,"src"), // 这里是将src目录配置别名为 @ 方便在项目中导入src目录下的文件
        }
    },
    // 引入第三方的配置,强制预构建插件包
    optimizeDeps: {
        include: [],
    },
    css: {
        preprocessorOptions: {
        },
    },
    json: {
        //是否支持从 .json 文件中进行按名导入 
        namedExports: true,
        //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好 
        stringify: false,
    },
    //继承自 esbuild 转换选项，最常见的用例是自定义 JSX 
    esbuild: {
    },
    // 打包配置
    build: {
        target: 'modules', // 设置最终构建的浏览器兼容目标。modules:支持原生 ES 模块的浏览器
        outDir: 'dist', // 指定输出路径
        assetsDir: 'assets', // 指定生成静态资源的存放路径
        assetsInlineLimit: '0', // 小于此阈值的导入或引用资源将内联为base64编码，设置为0可禁用此项。默认4096（4kb）
        cssCodeSplit: true, // 启用/禁用CSS代码拆分，如果禁用，整个项目的所有CSS将被提取到一个CSS文件中,默认true
        sourcemap: false, // 构建后是否生成 source map 文件
        // minify: 'terser', // 混淆器，terser构建后文件体积更小
        write: true,   //设置为 false 来禁用将构建后的文件写入磁盘  
        emptyOutDir: true,  //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。  
        brotliSize: true,  //启用/禁用 brotli 压缩大小报告 
        chunkSizeWarningLimit: 500,  //chunk 大小警告的限制 
        // terserOptions: {
        //     compress: {
        //         drop_console: true,
        //         drop_debugger: true,
        //     },
        // },   //去除 console debugger
    },
    assetsInclude:["src/assets/**"],
    // 本地运行配置，及反向代理配置
    server: {
        host: 'localhost', // 指定服务器主机名
        port: 3000, // 指定服务器端口
        open: true, // 在服务器启动时自动在浏览器中打开应用程序
        strictPort: false, // 设为 false 时，若端口已被占用则会尝试下一个可用端口,而不是直接退出
        https: false, // 是否开启 https
        cors: true, // 为开发服务器配置 CORS。默认启用并允许任何源
        proxy: { // 为开发服务器配置自定义代理规则
            // 字符串简写写法 
            // '/foo': 'http://192.168.xxx.xxx:xxxx',
            // 选项写法
            // '/api': {
            //     target: 'http://192.168.xxx.xxx:xxxx', //代理接口
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, '')
            // }
        }
    }
})