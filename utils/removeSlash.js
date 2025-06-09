export default function removeSlash(url) {
    if (url[url.length - 1] === '/') {
        return url.slice(0, -1)
    } else {
        return url
    }
}