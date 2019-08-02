
const withJSON = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

/**
 * Load items from localStorage
 * 
 * @param {*} items 
 */
export const loadFromLS = items => {
  
  if (!window.localStorage) {
    throw new Error("No local storage found");
  }
    
  return items.reduce((memo, item) => {
    memo[item] = withJSON(window.localStorage.getItem(item));
    return memo;
  },{});

}

/**
 * Set items to localStorage
 * 
 * @param {*} items 
 */
export const setToLS = items => {

  if (!window.localStorage) {
    throw new Error("No local storage found");
  }
    
  return Object.keys(items).map(key => 
    window.localStorage.setItem(key, items[key]));

}