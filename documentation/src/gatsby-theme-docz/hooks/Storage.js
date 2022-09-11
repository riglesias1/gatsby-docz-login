const isBrowser = () => typeof window !== "undefined";

export const getLocalStorage = (item, format = false) => {

    if (format) {
        return isBrowser() && JSON.parse(localStorage.getItem(item));
    } else {
        return isBrowser() && localStorage.getItem(item);
    }
}

export const setLocalStorage = (item, value = '') => {
    return isBrowser() && localStorage.setItem(item, value);
}

export const getSessionStorage = (item, format = false) => {

    if (format) {
        return isBrowser() && JSON.parse(sessionStorage.getItem(item));
    } else {
        return isBrowser() && sessionStorage.getItem(item);
    }
}

export const setSessionStorage = (item, value = '') => {
    return isBrowser() && sessionStorage.setItem(item, value);
}

export default {
    getLocalStorage,
    setLocalStorage,
    getSessionStorage,
    setSessionStorage,
};