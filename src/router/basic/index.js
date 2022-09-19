import { House, Management, User } from '@element-plus/icons-vue';
const Layout = () => import('layout/Index.vue');

export const basicRoutes = [
    {
        name: '404',
        path: '/404',
        component: () => import('layout/404.vue'),
        isHidden: true,
    },
    {
        name: 'Login',
        path: '/login',
        component: () => import('layout/login/Index.vue'),
        isHidden: true,
        meta: {
            title: '登录页',
        },
    },
    {
        name: 'Layout',
        path: '/',
        redirect: '/portal',
        component: Layout,
        meta: {
            title: '项目门户',
        },
        children: [
            {
                name: 'Portal',
                path: '/portal',
                component: () => import('views/portal/Index.vue'),
                meta: {
                    title: '项目门户',
                    icon: House,
                },
            },
            {
                name: 'ProjectManagement',
                path: '/projectManagement',
                component: () => import('views/projectManagement/Index.vue'),
                meta: {
                    title: '项目管理',
                    icon: Management,
                },
            },
            {
                name: 'UserInfo',
                path: '/userInfo',
                component: () => import('views/userInfo/Index.vue'),
                meta: {
                    title: '用户信息',
                    icon: User,
                },
            },
        ],
    },
];
