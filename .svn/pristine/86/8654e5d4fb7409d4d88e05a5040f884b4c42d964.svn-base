import instance, { get, post, upload } from './http.js';
import qs from 'qs';

const appDomain = '';
class QZAPI {
    constructor(opts = {}) {
        this.opts = opts;
        this.fetch(Object.entries(opts));
    }

    fetch(opts) {
        opts.forEach(([key, val]) => {
            const url = !/^http/.test(val.url) ? appDomain + val.url : val.url;
            const params = {
                url,
                options: val.options || { headers: instance.defaults.headers },
            };
            if (val.method.toUpperCase() === 'GET') {
                this[key] = (data, opt) => this._get(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { data }));
            } else if (val.method.toUpperCase() === 'POST') {
                this[key] = (data, opt) => this._post(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { data }));
            } else if (val.method.toUpperCase() === 'UPLOAD') {
                this[key] = (formData, opt) => this._upload(Object.assign(params, opt && { url: opt.url || params.url, options: opt.options || params.options } || {}, { formData }));
            }
        });
    }

    _get({ url, data, options }) {
        return get(url, data, options);
    }

    _post({ url, data, options }) {
        const contentType = options.headers && options.headers['Content-Type'] || instance.defaults.headers['Content-Type'];
        if (data && /urlencoded/.test(contentType)) {
            data = qs.stringify(data);
        }
        return post(url, data, options);
    }

    _upload({ url, formData, options }) {
        return upload(url, formData, options);
    }
}

window.QZAPI = QZAPI;

export default QZAPI;
