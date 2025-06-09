export default function cleanUpTitle() {
    return [...arguments]?.map(s => s?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(' ');
}