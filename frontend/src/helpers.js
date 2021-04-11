export async function request(url, method, body) {
    const response = await fetch('http://localhost:3001/' + url, {
        method,
        ...(() => !!body ? {
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        } : {})(),
    });
    return response.json();
}
