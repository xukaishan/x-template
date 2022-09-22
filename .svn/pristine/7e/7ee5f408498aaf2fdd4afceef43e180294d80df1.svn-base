/*
 * @Description: 组件相关的 hooks
 * @Author: xuks
 * @Date: 2022-06-25 15:10:25
 * @LastEditTime: 2022-09-14 10:09:48
 */

import { isFunction } from 'utils';
import { tryOnUnmounted } from '@vueuse/core';

/**
 * @description: 获取鼠标坐标
 * @return {mouse} 鼠标当前位置信息
 * @return {stop} stop清除副作用函数
 */
export function useMouse({ eventName, el, handler }) {
    const mouse = reactive({ x: 0, y: 0 });
    const element = unref(el) || window?.document;

    if (!eventName || !element) {
        throw new Error(`useMouse need an eventName and element, but got ${typeof eventName} and ${typeof element}`);
    }
    const handle = (ev) => {
        const { pageX, pageY, movementX, movementY, offsetX, offsetY, x, y, clientX, clientY } = ev;
        Object.assign(mouse, {
            pageX,
            pageY,
            movementX,
            movementY,
            offsetX,
            offsetY,
            clientX,
            clientY,
            x,
            y,
        });
        isFunction(handler) && handler(ev, mouse);
    };
    const stop = () => {
        element.removeEventListener(eventName, handle);
    };
    element && element.addEventListener(eventName, handle);
    /* 移除事件监听 */
    tryOnUnmounted(stop);

    return {
        mouse,
        stop,
    };
};
