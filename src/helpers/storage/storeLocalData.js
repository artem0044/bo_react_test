export const loadState = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return undefined;
    }
    return JSON.parse(data);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const data = JSON.stringify(state);
    localStorage.setItem(key, data);
  } catch (error) {
    // ignore
  }
};

export const removeState = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    // ignore
  }
};