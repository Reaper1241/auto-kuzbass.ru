export default function extractOOOName(text) {
    // Ищем паттерн "ООО «...»" с различными кавычками
    const pattern = /ООО\s*[«"“](.*?)[»"”]/i;
    const match = text.match(pattern);
    
    if (match && match[1]) {
        return match[1].trim();
    }
    
    // Альтернативный поиск, если первый вариант не сработал
    const alternativePattern = /ООО\s+([^.,\n]+)/i;
    const altMatch = text.match(alternativePattern);
    
    if (altMatch && altMatch[1]) {
        return altMatch[1].trim();
    }
    
    return null; // Если название не найдено
}