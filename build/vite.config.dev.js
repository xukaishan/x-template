import { loadEnv } from 'vite';
import baseCfg from './vite.base';

export default ({ command, mode }) => {
    const viteENV = loadEnv(mode, process.cwd());
    return {
        server: {
            proxy: {
                '/ks-prj': {
                    target: viteENV.VITE_LOGIN_URL,
                    changeOrigin: true,
                    secure: false,
                },
                '/api/ip': {
                    target: 'https://www.mxnzp.com',
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        resolve: baseCfg.resolve,
        css: baseCfg.css,
        extensions: baseCfg.extensions,
        plugins: baseCfg.plugins,
    };
};
