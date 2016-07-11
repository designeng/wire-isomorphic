export default function splitToTokens(url) {
    let tokens = url.split('/');
    // all urls have the structure '/firstToken[/secondToken ...]' - shift zero token after splitting:
    return tokens.slice(1);
}