export default function removeTrash(string) {
    return string.replace(/(\s\s|\&nbsp;)(?!\.)/g, ' ');
}