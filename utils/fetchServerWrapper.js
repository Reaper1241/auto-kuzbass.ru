import { useAppStore } from '/stores/AppStore.js';

// Возвращает тело ответа напрямую (как $fetch/ofetch).
// $fetch — обычная функция: безопасна в Promise.all, имеет встроенные timeout/retry
// и НЕ ломает SSR-payload (в отличие от useFetch, вызванного внутри хелпера).
export const fetchServerWrapper = (url, options = {}, timeoutDuration = 15000) => {
    const appStore = useAppStore();

    const defaultHeaders = {
        'X-Forwarded-For': appStore.ip || '',
        'Domain': 'https://auto-kuzbass.ru',
        ...options.headers,
    };

    return $fetch(url, {
        ...options,
        headers: defaultHeaders,
        timeout: timeoutDuration,
        retry: 2,
        retryDelay: 500,
    });
};
