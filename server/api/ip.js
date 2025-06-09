export default defineEventHandler((event) => {
    const req = event.node.req;

    // Получаем IP из заголовка x-forwarded-for
    let ip = req.headers['x-forwarded-for'];

    if (ip) {
        // Берем первый IP из списка (если есть несколько)
        ip = ip.split(',')[0].trim();
    } else {
        // Если x-forwarded-for отсутствует, используем remoteAddress
        ip = req.socket?.remoteAddress;
    }

    // Убираем возможные IPv6 префиксы (например, "::ffff:")
    if (ip && ip.startsWith('::ffff:')) {
        ip = ip.replace('::ffff:', '');
    }

    return { ip };

});

