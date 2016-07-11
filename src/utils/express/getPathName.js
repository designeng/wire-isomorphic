export default function getPathName(request) {
    return request._parsedUrl.pathname;
}