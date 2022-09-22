<script setup>
import { ElMenu, ElAside, ElScrollbar, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElIcon } from 'element-plus';
import asideSvg from 'assets/aside.svg';
import { useSystemStore } from 'store/modules/system';
import { useCssVar } from '@vueuse/core';

defineOptions({
    name: 'HomeAside',
});
const systemStore = useSystemStore();
const router = useRouter();
const menuOpts = computed(() => {
    return systemStore.menus;
});
const isCollapse = ref(false);

const handleMenuSelect = (index, routeResult) => {
    router.push(menuOpts.value[index].path);
};
const handleCollapse = (index, routeResult) => {
    isCollapse.value = !isCollapse.value;
    width.value = isCollapse.value ? '64px' : '220px';
};
const homeAside = shallowRef();
const width = useCssVar('--qz-ksv-layout-aside-width', homeAside, { initialValue: '220px' });
</script>

<template>
    <el-aside ref="homeAside" class="layout-aside" style="width: var(--qz-ksv-layout-aside-width)">
        <div class="aside-top">
            <aside-svg class="aside-collapse" @click="handleCollapse" />
        </div>
        <el-scrollbar>
            <el-menu :collapse="isCollapse" class="el-menu" @select="handleMenuSelect">
                <el-menu-item v-for="(menu, idx) in menuOpts" :key="idx" :index="`${idx}`" :route="menu">
                    <el-icon><component :is="menu.meta.icon" /></el-icon>
                    <template #title>
                        {{ menu.meta.title }}
                    </template>
                </el-menu-item>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>
