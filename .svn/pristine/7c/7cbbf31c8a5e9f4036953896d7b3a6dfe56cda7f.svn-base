import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import DefineOptions from 'unplugin-vue-define-options/vite';
import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            assets: resolve(__dirname, '../src/assets'),
            locale: resolve(__dirname, '../src/locale'),
            components: resolve(__dirname, '../src/components'),
            layout: resolve(__dirname, '../src/layout'),
            router: resolve(__dirname, '../src/router'),
            hooks: resolve(__dirname, '../src/hooks'),
            store: resolve(__dirname, '../src/store'),
            plugins: resolve(__dirname, '../src/plugins'),
            styles: resolve(__dirname, '../src/styles'),
            utils: resolve(__dirname, '../src/utils'),
            views: resolve(__dirname, '../src/views'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // additionalData: '@use "../packages/styles/variables.scss" as *;',
            },
        },
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    plugins: [
        vue({
            include: [/\.vue$/],
        }),
        svgLoader(),
        DefineOptions(),
        eslintPlugin({
            include: ['src/**/*.js', 'src/**/*.vue'],
            exclude: ['./node_modules/**'],
            cache: false,
        }),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
        }),
    ],
});
