const PassErrorCode = [0, 1, 1001, 1002]; // 不拦截的errorCode

const instance = window.axios.create({
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
});
let loginOutLock = false; // 退出登录锁（避免token失效，多次弹框）

const getUserInfo = function () {
    let userInfo = {};
    try {
        userInfo = window.$vue.$store.state.user.userInfo || {};
    } catch (e) {
        // console.log(e);
        userInfo = window.yxpStorage.persistent.get('user.userInfo') || {};
    }
    return userInfo;
};

function streamType(config) {
    return ['blob', 'arraybuffer'].includes(config.responseType);
}

// 请求拦截器
instance.interceptors.request.use(
    config => {
        let token = '';
        if (!config.headers) {
            config.headers = {};
        }
        if (config.params && config.params.Authorization) {
            token = config.params.Authorization;
        } else {
            token = getUserInfo().token;
        }
        token && (config.headers.Authorization = token);
        if (window.yxpSystemConfig && window.yxpSystemConfig.apiBaseUrl) {
            config.baseURL = window.yxpSystemConfig.apiBaseUrl;
        }
        return config;
    },
    error => {
        return Promise.error(error);
    },
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 304) {
            if (response.data.errcode === undefined) {
                if (!streamType(response.config)) {
                    response.data.errmsg = '请设置responseType！';
                }
            } else if (response.data.errcode.toString().startsWith('4')) {
                if (response.data.errcode.toString() === '403') {
                    // 没有权限
                    window.ELEMENT.Message({
                        type: 'error',
                        duration: process.env.NODE_ENV === 'development' ? 0 : 1500,
                        showClose: true,
                        message: response.data.errmsg,
                    });
                } else {
                    if (!loginOutLock) {
                        loginOutLock = true;
                        window.ELEMENT.Message({
                            type: 'error',
                            duration: process.env.NODE_ENV === 'development' ? 0 : 1500,
                            showClose: true,
                            message: response.data.errmsg,
                            onClose() {
                                // 跳转登录
                                window.$vue ? window.$vue.$store.commit('user/LOGINOUT') : console.log('%c登录失效！！', 'color: red; background: skyblue; font-size: 24px; ');// 如果这里报错，排查对应系统是否vux中是否有此action
                            },
                        });
                    }
                }
                return Promise.reject(response);
            } else if (!(PassErrorCode.includes(response.data.errcode) || response.data.errcode.toString().startsWith('2'))) {
                response.data.errmsg = '系统异常，请联系管理员！！！';
            }
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        const response = { status: -404, statusText: '本地网络错误' };
        return Promise.reject(error.response || response);
    },
);

/**
 * 响应format
 * @param response
 * @param format
 * @returns
 */
function responseFormat(response, format = false) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304)) {
        if (format && (response.data.errcode || response.data.code)) {
            return {
                errcode: response.data.errcode || responseCodeFormat(response.data.code),
                errmsg: response.data.errmsg || response.data.msg,
                data: response.data.data,
            };
        } else {
            if (streamType(response.config)) { // 流类型直接返回
                return response;
            }
            return response.data;
        }
    }

    // 异常状态下，保持格式统一
    return {
        errcode: response.status,
        errmsg: '请检查网络或稍后重试(' + response.status + ')',
        statusText: response.statusText,
        data: response.data,
    };
}

function responseCodeFormat(code) {
    // 代表成功的code 统一返回 0
    const errcode = ['0', 0, 200, '200'];
    if (errcode.includes(code)) {
        return 0;
    }
    return code;
}

export async function get(url, params, options = {}) {
    const send = {
        timeout: options.timeout || instance.defaults.timeout,
        method: 'get',
        url,
        params,
        headers: options.headers,
        cancelToken: new window.axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export async function post(url, data, options = {}) {
    const send = {
        timeout: options.timeout || instance.defaults.timeout,
        method: 'post',
        url,
        data,
        headers: options.headers,
        cancelToken: new window.axios.CancelToken(function executor(c) {
            // executor 函数接收一个 cancel 函数作为参数
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
        responseType: options.responseType || 'json',
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response, true);
        },
    );
}

export async function upload(url, formData, options = {}) {
    const send = {
        timeout: options.timeout || 30000,
        method: 'post',
        url,
        data: formData,
        headers: Object.assign({}, options.headers, { 'Content-Type': 'multipart/form-data' }),
        // `onUploadProgress` 允许为上传处理进度事件
        onUploadProgress: function (progressEvent) {
            typeof options.onUploadProgress === 'function' && options.onUploadProgress(progressEvent);
        },
        cancelToken: new window.axios.CancelToken(function executor(c) {
            typeof options.setCancel === 'function' && options.setCancel(c);
        }),
    };
    return instance(send).then(
        (response) => {
            return responseFormat(response);
        },
    );
}

export default instance;
