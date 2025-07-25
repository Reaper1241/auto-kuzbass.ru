export default function makeSpaces(number) {
    if (!number) {
        return 0
    }
    let parts = number.toString().split(" ");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(" ");
}