export const createEl = (tag, text, atr = {}) => {
    const elem = document.createElement(tag);
    elem.textContent = text;
    Object.keys(atr).forEach((key) =>{
        elem.setAttribute(key, atr[key])
    })
return elem
};