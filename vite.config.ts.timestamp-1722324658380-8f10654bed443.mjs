// vite.config.ts
import { defineConfig } from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/unplugin-vue-components/dist/vite.js";
import { VantResolver } from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/@vant/auto-import-resolver/dist/index.esm.mjs";
import VueSetupExtend from "file:///E:/project/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D/friend-frontend/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  server: {
    host: "0.0.0.0"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxwcm9qZWN0XFxcXFx1NEYxOVx1NEYzNFx1NTMzOVx1OTE0RFxcXFxmcmllbmQtZnJvbnRlbmRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXHByb2plY3RcXFxcXHU0RjE5XHU0RjM0XHU1MzM5XHU5MTREXFxcXGZyaWVuZC1mcm9udGVuZFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovcHJvamVjdC8lRTQlQkMlOTklRTQlQkMlQjQlRTUlOEMlQjklRTklODUlOEQvZnJpZW5kLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ0B2YW50L2F1dG8taW1wb3J0LXJlc29sdmVyJztcblxuXG5pbXBvcnQgVnVlU2V0dXBFeHRlbmQgZnJvbSAndml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZCdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW1xuICAgICAgICB2dWUoKSxcbiAgICAgICAgVnVlU2V0dXBFeHRlbmQoKSxcbiAgICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgICAgICByZXNvbHZlcnM6IFtWYW50UmVzb2x2ZXIoKV0sXG4gICAgICAgIH0pLFxuICAgICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBzZXJ2ZXI6e1xuICAgICAgICBob3N0OiAnMC4wLjAuMCdcbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1VCxTQUFRLG9CQUFtQjtBQUNsVixPQUFPLFNBQVM7QUFJaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUyxvQkFBb0I7QUFHN0IsT0FBTyxvQkFBb0I7QUFHM0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDeEIsU0FBUztBQUFBLElBQ0wsSUFBSTtBQUFBLElBQ0osZUFBZTtBQUFBLElBQ2YsV0FBVztBQUFBLE1BQ1AsV0FBVyxDQUFDLGFBQWEsQ0FBQztBQUFBLElBQzlCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNQLFdBQVcsQ0FBQyxhQUFhLENBQUM7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDTDtBQUFBLEVBQ0EsUUFBTztBQUFBLElBQ0gsTUFBTTtBQUFBLEVBQ1Y7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
