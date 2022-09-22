<script setup>
import { ElContainer } from 'element-plus';
import HomeAside from './components/HomeAside.vue';
import HomeHeader from './components/HomeHeader.vue';
import HomeMain from './components/HomeMain.vue';
defineOptions({
    name: 'Layout',
});
</script>

<template>
    <el-container class="layout-home">
        <home-aside></home-aside>
        <el-container class="layout-wrapper">
            <home-header style=""></home-header>
            <home-main></home-main>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.layout-home {
    height: 100vh;
    width: 100%;
    .layout-aside {
        background: var(--el-color-primary);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
        transition: width .5s;
        padding: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;
        ::v-deep(.el-menu) {
            border-right: none;
            background: var(--el-color-primary);
            .el-menu-item{
                color: #fff!important;
                &:hover{
                    background-color: var(--el-color-primary-light-3);
                }
            }
        }
        ::v-deep(.aside-top) {
            padding: 20px;
            height: 60px;
            display: flex;
            .aside-collapse {
                display: none;
                cursor: pointer;
                color: #fff;
            }
            &:hover{
                .aside-collapse {
                    display: block;
                }
            }
        }
    }
    .layout-wrapper {
        display: flex;
        flex-direction: column;
        .layout-header {
            height: 60px;
            padding: 0 50px;
            display: flex;
            flex: 1;
            align-items: center;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
            border-bottom: 1px solid rgba(60, 60, 67, 0.12);
            ::v-deep(.toolbar){
                display: flex;
                justify-content: flex-end;
                min-width: 260px;
                margin-left: auto;
                height: 100%;
            }
        }
        .layout-main {
            width: 100%;
            height: 100vh;
            overflow-x: hidden;
            padding: 0px;
        }
    }
}
</style>
