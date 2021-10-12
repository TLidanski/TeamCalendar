export const getJson = async (url, params, headers) => {
    const urlObj = new URL(url);
    urlObj.search = new URLSearchParams(params).toString();

    const response = await fetch(urlObj, {
        method: 'GET',
        headers: {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    return await response.json();
}