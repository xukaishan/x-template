/*
 * @Description: 主题控制
 * @Author: xuks
 * @Date: 2022-09-14 15:10:25
 * @LastEditTime: 2022-09-19 10:30:28
 */
import { useSystemStore } from 'store/modules/system';

export function useThemes() {
    const systemStore = useSystemStore();
    const themes = ref(systemStore.userSetting.themes);
    watch(() => themes.value, (theme) => {
        document.documentElement.className = theme;
        systemStore.setTheme(theme);
    });
    onMounted(() => {
        document.documentElement.className = themes.value;
    });

    return { themes };
}