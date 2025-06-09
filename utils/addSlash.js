export default function addSlash(url) {
    if (url[url.length - 1] === '/') {
        return url
    } else {
        return url + '/'
    }
}