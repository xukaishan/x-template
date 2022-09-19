import { isObject, isString } from './type';
export const deepMerge = (target, newObj) => {
    Object.keys(newObj).forEach((key) => {
        const targetValue = target[key];
        const newObjValue = newObj[key];
        if (isObject(targetValue) && isObject(newObjValue)) {
            deepMerge(targetValue, newObjValue);
        } else {
            target[key] = newObjValue;
        }
    });
    return target;
};

export function getPropByPath(obj, keyPath) {
    try {
        return keyPath.split('.').reduce((pre, cur) => pre[cur], obj);
    } catch (error) {
        return '';
    }
};

export function str2Arr(str = '', separator = ',') {
    if (isObject(str)) return [];
    return `${unref(str)}`.split(separator);
}

export function arr2Str(arr = [], separator = ',') {
    if (isObject(arr)) return '';
    if (isString(arr)) return arr;
    return unref(arr).join(separator);
}
/**
 * @description: 数组转为树形结构
 * @param {*} list 待转换的数组
 * @param {*} opts 字段映射
 * @return {} res 结果树形结构
 */
export function listToTree(list = [], opts = {}) {
    const res = [];
    const { childrenKey, pIdKey, idKey } = Object.assign({ idKey: 'id', childrenKey: 'children', pIdKey: 'pId' }, opts);
    const mapObj = list.reduce((pre, cur) => (pre[cur[idKey]] = cur, pre), {});
    for (const item of list) {
        if (!item[pIdKey] || `${item[pIdKey]}` === '0') {
            res.push(item);
            continue;
        }
        if (item[pIdKey] in mapObj) {
            const parent = mapObj[item[pIdKey]];
            parent[childrenKey] = parent[childrenKey] || [];
            parent[childrenKey].push(item);
        }
    }
    return res;
}
/**
 * @description: 数组去重
 * @param {*} arr
 * @return {*} 去重后的数组
 */
export function unique(arr) {
    if (!Array.isArray(arr)) {
        throw new Error(`args[0] required Array, but got ${typeof arr}`);
    }
    return Array.from(new Set(arr));
}

/**
 * @description: 日期格式化
 * @param {*} fmt 格式化类型：YY-MM-DD HH:mm:ss, YY/MM/DD HH:mm, YY.MM.DD 等
 * @exp dateFormat(new Date(), 'YY-MM-DD HH:mm:ss') 2022-08-01 11:19:26
 * @exp dateFormat(new Date(), 'YY/MM/DD HH:mm') 2022/08/01 11:19
 * @return {*} 格式化后的日期字符
 */
export function dateFormat (date, fmt = 'YY-MM-DD') {
    let ret;
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'M+': (date.getMonth() + 1).toString(), // 月
        'D+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'm+': date.getMinutes().toString(), // 分
        's+': date.getSeconds().toString(), // 秒
    };
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
        };
    };
    return fmt;
};
