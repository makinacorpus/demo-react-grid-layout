export const getFromLS = key => {
  let ls = {};

  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('demo-rgl')) || {};
    } catch (e) {
      /* Ignore */
    }
  }

  return ls[key];
};

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem('demo-rgl', JSON.stringify({ [key]: value }));
  }
};
