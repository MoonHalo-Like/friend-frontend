import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path'

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';


import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VueSetupExtend(),
        AutoImport({
            resolvers: [VantResolver()],
        }),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    server:{
        host: '0.0.0.0'
    }
})
