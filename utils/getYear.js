export default function getYear(year) {
    if (year % 10 === 1 && year % 100 !== 11) {
        return `${year} год`;
    } else if (year % 10 >= 2 && year % 10 <= 4 && !(year % 100 >= 12 && year % 100 <= 14)) {
        return `${year} года`;
    } else {
        return `${year} лет`;
    }
}