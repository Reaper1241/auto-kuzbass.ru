import { useAppStore } from '/stores/AppStore.js';

export const fetchClientWrapper = (url, options = {}, timeoutDuration = 5000) => {
    const appStore = useAppStore();
    const controller = new AbortController();
    const signal = controller.signal;

    // Обязательные заголовки
    const defaultHeaders = {
        'X-Forwarded-For': appStore.ip || '',
        ...options.headers,
    };

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutDuration);

    return new Promise((resolve, reject) => {
        fetch(url, { ...options, headers: defaultHeaders, signal }) // Используем стандартный fetch
            .then(response => {
                clearTimeout(timeoutId);
                if (!response.ok) {
                    return reject(new Error(`Network response was not ok: ${response.status} ${response.statusText}`));
                }
                // Возвращаем ответ, чтобы можно было использовать res.json()
                resolve(response); // Возвращаем ответ, а не данные
            })
            .catch(error => {
                clearTimeout(timeoutId);
                console.error('Fetch error:', error);
                reject(error);
            });
    });
};