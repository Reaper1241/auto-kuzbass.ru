import { useAppStore } from '/stores/AppStore.js';

export const fetchServerWrapper = async (url, options = {}, timeoutDuration = 5000) => {
    const appStore = useAppStore();
    const controller = new AbortController();
    const signal = controller.signal;

    // Обязательные заголовки
    const defaultHeaders = {
        'X-Forwarded-For': appStore.ip || '',
        'Domain': 'https://auto-kuzbass.ru',
        ...options.headers,
    };

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutDuration);

    try {
        const response = await useFetch(url, { ...options, headers: defaultHeaders, signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};