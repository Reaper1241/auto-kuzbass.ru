export default function getSaleDate() {
const today = new Date();
  const dateIn7Days = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const months = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
  ];
  const day = dateIn7Days.getDate();
  const month = months[dateIn7Days.getMonth()];
  return `${day} ${month}`;
}