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

export const STATUS = {
    TIE: 'TIE',
    X_WIN: 'X_WIN',
    O_WIN: 'O_WIN',
    NOT_FINISHED: 'NOT_FINISHED',
    CREATED: 'CREATED'
}

export const PLAYER = {
    X: 'X',
    O: 'O'
}
