export default function cleanUpTitle() {
    return [...arguments]?.map(s => s?.toUpperCase().replace(/_/g, ' ')).join(' ');
}