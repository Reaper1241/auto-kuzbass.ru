export function htmlSanitizer(dirtyHtml) {
    // Список запрещенных тегов
    const forbiddenTags = ['script', 'iframe', 'style', 'link', 'meta', 'object', 'embed'];

    // Удаление запрещенных тегов
    forbiddenTags.forEach(tag => {
        // Удаляем открывающие и закрывающие теги
        const tagRegex = new RegExp(`</?${tag}\\b[^>]*>`, 'gi');
        dirtyHtml = dirtyHtml.replace(tagRegex, '');
    });

    // Удаление пустых тегов <span></span>
    dirtyHtml = dirtyHtml.replace(/<span\b[^>]*>(.*?)<\/span>/g, (match, content) => {
        return content.trim() ? match : '';
    });

    // Удаление пустых тегов <li>
    dirtyHtml = dirtyHtml.replace(/<li\b[^>]*>(.*?)<\/li>/g, (match, content) => {
        return content.trim() ? match : '';
    });

    // Дополнительно: удаление inline JavaScript атрибутов (on* events)
    dirtyHtml = dirtyHtml.replace(/\son[a-zA-Z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]*)/gi, '');

    return dirtyHtml;
}