(function(global) {
    const config = {
        env: (function() {
            return import.meta.env.VITE_APP_ENV;
        })(),
    };
    // 获取wsHost
    function getWsHost() {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
        if (apiBaseUrl) {
            return protocol + apiBaseUrl.replace('https:', '').replace('http:', '');
        } else {
            return protocol + '//' + window.location.host;
        }
    }
    global.qzSystemConfig = {
        appCode: 'ksv-platform',
        env: config.env,
        loginUrl: import.meta.env.VITE_LOGIN_URL,
        apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
        wsHost: getWsHost(),
    };
})(window);
