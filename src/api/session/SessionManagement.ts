export function setSessionItem(keyName: string, value: string) {
    sessionStorage.setItem(keyName, value);
}

export function getSessionItem(keyName: string) {
    const value = sessionStorage.getItem(keyName);
    if (value === null) {
        throw new Error(`Key ${keyName} not found in sessionStorage`);
    }
    return value;
}