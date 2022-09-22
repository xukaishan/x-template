const { toString } = Object.prototype;

export function isString(obj) {
    return toString.call(obj) === '[object String]';
}

export function isNumber(obj) {
    return toString.call(obj) === '[object Number]' && !isNaN(obj);
}

export function isObject(obj) {
    return toString.call(obj) === '[object Object]';
}

export function isHtmlElement(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
}

export const isFunction = (functionToCheck) => {
    return functionToCheck && toString.call(functionToCheck) === '[object Function]';
};

export const isUndefined = (val) => {
    return val === void 0;
};

export const isDefined = (val) => {
    return val !== undefined && val !== null;
};

export const isPromise = (val) => {
    return toString.call(val) === '[object Promise]';
};
