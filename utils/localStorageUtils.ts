const isClient = typeof window !== "undefined" && window.localStorage;

export const getLocalStorage = (key: string) => {
  if (isClient) {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key)!)
      : [];
  }
  return [];
};

export const setLocalStorage = (key: string, value: any) => {
  if (isClient) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (isClient) {
    localStorage.removeItem(key);
  }
};
