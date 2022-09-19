import ZhCNLang from './lang/zh-CN';
import EnUSLang from './lang/en-US';
import { isFunction, getPropByPath, deepMerge } from 'utils';

// 组件默认语言设置
export const langs = reactive({
    'zh-CN': new ZhCNLang(),
    'en-US': new EnUSLang(),
});

export class Locale {
    static currentLang = ref(Storage.persistent.get('language') || (Storage.persistent.set('language', 'zh-CN'), 'zh-CN'));
    static languages() {
        return langs[this.currentLang.value];
    }

    static use(lang, NewLanguages) {
        if (newLanguages) {
            langs[lang] = new NewLanguages();
        }
        this.currentLang.value = lang;
    }

    static merge(lang, newLanguages) {
        if (newLanguages) {
            if (langs[lang]) {
                deepMerge(langs[lang], newLanguages);
            } else {
                Locale.use(lang, newLanguages);
            }
        }
    }
}

/**
 * @description: 使用国际化
 * @return {*} { t, setLang }: t国际化语言函数, setLang切换语言方法
 */
export function useLocale(prefix = '') {
    return {
        currentLang: Locale.currentLang,
        t: (keyPath = '', ...args) => {
            const languages = Locale.languages();
            const text = getPropByPath(languages, prefix + keyPath);
            return isFunction(text) ? text(...args) : text;
        },
        setLang: (val) => {
            Locale.currentLang.value = val;
            Storage.persistent.set('language', val);
        },
    };
};

export default Locale;
