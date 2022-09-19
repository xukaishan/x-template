import { resolve } from 'path';
import { defineConfig } from 'vite';
import baseCfg from './vite.base';
import babel from 'rollup-plugin-babel';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    resolve: baseCfg.resolve,
    css: baseCfg.css,
    extensions: baseCfg.extensions,
    plugins: baseCfg.plugins,
    base: './',
    build: {
        target: 'es2015',
        rollupOptions: {
            external: [],
            plugins: [
                babel({
                    exclude: '**/node_modules/**',
                }),
                visualizer({
                    open: true,
                    gzipSize: true,
                    brotliSize: true,
                }),
            ],
        },
        emptyOutDir: true,
    },
});
