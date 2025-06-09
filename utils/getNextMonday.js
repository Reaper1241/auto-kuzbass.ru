export default function getNextMonday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysUntilMonday = (1 - dayOfWeek + 7) % 7;
    const nextMonday = new Date(today.getTime() + (dayOfWeek === 1 ? 7 : daysUntilMonday) * 24 * 60 * 60 * 1000);
    return nextMonday.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}