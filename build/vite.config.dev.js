import { defineConfig } from 'vite';
import baseCfg from './vite.base';

export default defineConfig({
    server: {
        proxy: {
            '/mock30700': {
                target: 'https://192.168.2.215:30700',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/\/mock30700/, ''),
            },
        },
    },
    resolve: baseCfg.resolve,
    css: baseCfg.css,
    extensions: baseCfg.extensions,
    plugins: baseCfg.plugins,
});
