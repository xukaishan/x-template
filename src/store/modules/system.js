import { defineStore } from 'pinia';
import { basicRoutes } from 'router/basic';

export const useSystemStore = defineStore('system', {
    state() {
        return {
            userSetting: {
                themes: Storage.persistent.get('themes') || 'bule',
            },
        };
    },
    getters: {
        routes() {
            return basicRoutes;
        },
        menus() {
            const layout = this.routes.find(route => route.name === 'Layout');
            return (layout.children ?? []);
        },
    },
    actions: {
        setTheme(val) {
            this.userSetting.themes = val;
            Storage.persistent.set('themes', val);
        },
    },
});
