<script setup>
import { ElMain } from 'element-plus';
defineOptions({
    name: 'HomeMain',
});
</script>

<template>
    <el-main class="layout-main">
        <router-view v-slot="{ Component }">
            <transition name="el-fade-in">
                <component :is="Component" />
            </transition>
        </router-view>
    </el-main>
</template>
